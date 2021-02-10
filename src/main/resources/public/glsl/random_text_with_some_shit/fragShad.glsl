uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_clicks;

struct Brush {
    vec3 color;
    float opacity;
} brush;

vec2 coord;
vec3 color;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    UTIL FUNCTIONS
//

void draw() {color = mix(color, brush.color, brush.opacity);}

vec2 rotate(vec2 coord, float angle) {
    return coord * mat2(
        cos(angle),-sin(angle),
        sin(angle), cos(angle)
    );
}

vec2 move(vec2 coord, vec2 where) {
    return coord + where;
}

vec2 resize(vec2 coord, vec2 scale) {
    return coord / scale;
}
vec2 resize(vec2 coord, float scale) {
    return coord / scale;
}

vec2 toGrid(vec2 coord, vec2 scale) {
    return fract(coord * scale);
}
vec2 toGrid(vec2 coord, float scale) {
    return fract(coord * scale);
}

float rand(vec2 coord) {
    return 
    fract(
        sin(
            dot(
                coord,
                vec2(12.9898, 78.233)
            )
        ) * 3425.5453123
    );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    INTERFACE
//

void init();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setVariables();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setColor();
void drawTile();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    MAIN CODE
//

#define PI_1_4 0.78539816339
#define PI_1_3 1.0471975512
#define PI_1_2 1.57079632679
#define PI_2_3 2.09439510239
#define PI_7_6 3.66519142919
#define PI 3.14159265359
#define PI_2_1 6.28318530718

// STRUCTS:

struct Circle {
    vec2 center;
    float radius;
};

float getCircle(vec2 coord, in Circle circle, float smoothValue) {
    float d = distance(coord, circle.center);
    return smoothstep(d, d + smoothValue, circle.radius);
}

struct Rect {
    vec2 center;
    float width;
    float height;
};

float getRect(vec2 coord, in Rect rect, float smoothValue) {
            
    vec2 r_lb = rect.center - vec2(rect.width, rect.height) / 2.0;
    
    float l = smoothstep(coord.x, coord.x - smoothValue, r_lb.x);
    float r = smoothstep(coord.x, coord.x + smoothValue, r_lb.x + rect.width);
    float b = smoothstep(coord.y, coord.y - smoothValue, r_lb.y);
    float t = smoothstep(coord.y, coord.y + smoothValue, r_lb.y + rect.height);
    
    return l * r * b * t;
}

float getEquilateral(vec2 coord, int n, float smoothValue) {
    
    float a = atan(coord.x, coord.y) + PI;
    float b = PI_2_1 / float(n);
    float f = cos(floor(0.5 + a / b) * b - a) * length(coord); // some shit idk what it is
    float res = smoothstep(f, f + smoothValue, 0.5);
    
    return res;
}

// CONSTANTS:

#define BLACK vec3(0.0)
#define WHITE vec3(1.0)

#define GRID_X_SIZE 30.0
#define GRID_Y_SIZE 20.0

#define GRID_CELLS 600.0

// main = 3 parts:
// init + set variables + set frag color
void main() {
    init();
    setVariables();
    setColor();
    gl_FragColor = vec4(color, 1.0);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// VARIABLES:

vec2 gridCoord;
vec2 gridFloat;
vec2 gridInt;
vec2 tile;
float tileIndex;
float speed;
float rgbOffset;
float sizeFactor;

// FUNCTIONS:

void init() {
    coord = gl_FragCoord.xy / u_resolution.xy;
    color = vec3(1.0);
    brush.opacity = 1.0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void move() {

    #define LEFT_SPEED_MULTIPLIER 0.2;
    #define RIGHT_SPEED_MULTIPLIER 0.5;

    #define RIGHT_SPEED_OFFSET 10.0
    #define MOUSE_SPEED_MULTIPLIER 60.0
    #define MOUSE_OFFSET_MULTIPLIER 1.0

    float mouseSpeedOffset = (u_mouse.x - 0.5) * MOUSE_SPEED_MULTIPLIER;
    float offset = u_mouse.x * MOUSE_OFFSET_MULTIPLIER;

    if (fract(gridInt.y * 0.5) < 0.5) {
        speed = gridInt.y + mouseSpeedOffset * LEFT_SPEED_MULTIPLIER;
        gridCoord.x -= u_time * speed + offset;
    } else {
        speed = (GRID_Y_SIZE - RIGHT_SPEED_OFFSET - gridInt.y - mouseSpeedOffset) * RIGHT_SPEED_MULTIPLIER;
        gridCoord.x += u_time * speed;
    }
    gridInt = floor(gridCoord);
}

void setVariables() {

    #define SPEED_SIZE_FACTOR 30.0

    gridCoord = coord * vec2(GRID_X_SIZE, GRID_Y_SIZE);
    gridInt = floor(gridCoord);

    move();
    speed = abs(speed);
    sizeFactor = 0.0 + SPEED_SIZE_FACTOR / (speed + 1.0);
    rgbOffset = 0.15;

    gridFloat = fract(gridCoord) * (sizeFactor + 2.0 * rgbOffset) - rgbOffset;


    tileIndex = rand(gridInt);
}

// index = [0, 1]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setColor() {
    drawTile();
}

// tile types:


#define smoothValue 0.03

float full() {
    return getRect(
        gridFloat,
        Rect(
            vec2(0.5),
            1.0,
            1.0
        ),
        smoothValue
    );
}
float c() {
    Rect r_plus = Rect(
        vec2(0.5),
        1.0,
        1.0
    );
    Rect r_minus = Rect(
        vec2(0.75, 0.5),
        0.5,
        0.33
    );

    float f_plus = getRect(
        gridFloat,
        r_plus,
        smoothValue
    );
    float f_minus = getRect(
        gridFloat,
        r_minus,
        smoothValue
    );

    return f_plus - f_minus;
}
float cReverse() {
    Rect r_plus = Rect(
        vec2(0.5),
        1.0,
        1.0
    );
    Rect r_minus = Rect(
        vec2(0.25, 0.5),
        0.5,
        0.66
    );

    float f_plus = getRect(
        gridFloat,
        r_plus,
        smoothValue
    );
    float f_minus = getRect(
        gridFloat,
        r_minus,
        smoothValue
    );

    return f_plus - f_minus;
}
float circle() {
    return getRect(
        gridFloat,
        Rect(
            vec2(0.25, 0.25),
            0.5,
            0.5
        ),
        smoothValue
    );
}
float stick() {
    return getRect(
        gridFloat,
        Rect(
            vec2(0.25, 0.5),
            0.4,
            1.0
        ),
        smoothValue
    );
}
float stickHorisontal() {
    return getRect(
        gridFloat,
        Rect(
            vec2(0.5, 0.5),
            1.0,
            0.2
        ),
        smoothValue
    );
}
float triangle() {

    #define TRIANGLE_RGB_EXTRA_OFFSET 0.044
    #define X_OFFSET 0.5
    #define X_SIZE_FACTOR 0.88

    gridFloat.x += TRIANGLE_RGB_EXTRA_OFFSET;

    float subtrahend = 1.0 - getRect(
        gridFloat,
        Rect(
            vec2(0.5),
            1.0,
            1.0
        ),
        smoothValue
    );

    gridFloat.x -= X_OFFSET;
    gridFloat.x /= X_SIZE_FACTOR;

    float res = getEquilateral(
        gridFloat,
        3,
        smoothValue
    );

    gridFloat.x += X_OFFSET;
    gridFloat.x *= X_SIZE_FACTOR;

    return res - subtrahend;
}

#define frecuencyFactor u_mouse.y
#define charCount_minus_1 7.0

float normalizeIndex(float i) {
    return frecuencyFactor + (1.0 - frecuencyFactor) * i / charCount_minus_1;
}

float getTile() {

    #define i tileIndex
    #define ni normalizeIndex

    if (i < frecuencyFactor) {
        return 0.0;
    } else if (i < ni(1.0)) {
        return full();
    } else if (i < ni(2.0)) {
        return c();
    } else if (i < ni(3.0)) {
        return cReverse();
    } else if (i < ni(4.0)) {
        return circle();
    } else if (i < ni(5.0)) {
        return stick();
    } else if (i < ni(6.0)) {
        return stickHorisontal();
    } else if (i < ni(7.0)) {
        return triangle();
    } else {
        return 0.0;
    }
}

void drawTile() {

    #define RED vec3(1.0, 0.0, 0.0);
    #define GREEN vec3(0.0, 1.0, 0.0);
    #define BLUE vec3(0.0, 0.0, 1.0);

    gridFloat.x -= rgbOffset;
    float r = getTile();
    
    gridFloat.x += rgbOffset;
    float g = getTile();

    gridFloat.x += rgbOffset;
    float b = getTile();

    if (mod(u_clicks, 2.0) == 1.0) {
        brush.color = vec3(r, g, b);
    } else {
        brush.color = vec3(1.0) - vec3(r, g, b);
    }
    draw();
}