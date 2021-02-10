uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float iteration;

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
                vec2(12.9898 + iteration, 78.233)
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
void setTile(vec2 coord, float index);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setColor();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    MAIN CODE
//

// STRUCTS:

struct Circle {
    vec2 center;
    float radius;
};

float getCircle(vec2 coord, in Circle circle, float smoothValue) {
    float d = distance(coord, circle.center);
    return smoothstep(d, d + smoothValue, circle.radius);
}

// CONSTANTS:

#define BLACK vec3(0.0)
#define WHITE vec3(1.0)
#define GRAY vec3(0.2)

#define PI_1_4 0.78539816339
#define PI_1_3 1.0471975512
#define PI_1_2 1.57079632679
#define PI_2_3 2.09439510239
#define PI_7_6 3.66519142919
#define PI 3.14159265359
#define PI_2_1 6.28318530718

#define SQRT_2 1.41421356237

#define GRID_SIZE 30.0
#define GRID_SIZE_POW_2 900.0

// VARIABLES:

vec2 tile;
vec2 gridCoord;

// FUNCTIONS:

// main = 3 parts:
// init + set variables + set frag color
void main() {
    init();
    setVariables();
    setColor();
    gl_FragColor = vec4(color, 1.0);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void init() {
    coord = gl_FragCoord.xy / u_resolution.xy;
    color = WHITE;
    brush.opacity = 1.0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setVariables() {
    coord += u_mouse * 0.5;
    gridCoord = coord * GRID_SIZE;
    vec2 floatPos = fract(gridCoord);
    vec2 intPos = floor(gridCoord);
    setTile(floatPos, rand(intPos));
}

// index = [0, 1]
void setTile(vec2 coord, float index) {
    if (index < 0.25) {
        tile = coord;
    } else if (index < 0.5) {
        tile = vec2(1.0) - coord;
    } else if (index < 0.75) {
        coord.x = 1.0 - coord.x;
        tile = coord;
    } else {
        coord.x = 1.0 - coord.x;
        tile = vec2(1.0) - coord;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setColor() {

    vec2 intPos = floor(gridCoord * 10.0);
    float r = sin(u_time + gridCoord.x);
    float g = pow(fract(rand(intPos + u_mouse) + u_time), 4.0) / 2.0;
    float b = cos(u_time * 20.0 + gridCoord.y * 2.0);
    brush.color = vec3(r, g, b);
    brush.opacity = 1.0;
    draw();

    brush.color = BLACK;
    Circle proto = Circle(vec2(1.0, 0.0), 0.2);
    float smoothValue = 0.1;
    float c1 = getCircle(
        tile,
        proto,
        smoothValue
    );
    proto.center = vec2(0.0, 1.0);
    float c2 = getCircle(
        tile,
        proto,
        smoothValue
    );
    float line = smoothstep(tile.x - 0.3, tile.x - 0.1, tile.y) -
                 smoothstep(tile.x + 0.1, tile.x + 0.3, tile.y);

    brush.opacity = c1 + c2 + line;
    draw();
}