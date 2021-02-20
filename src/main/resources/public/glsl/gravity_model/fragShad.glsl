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

float rand(float x) {
    return fract(sin(x) * 6543.6544);
}
float rand(vec2 coord) {
    return fract(sin(dot(coord,vec2(12.9898, 78.233))) * 3425.5453);
}

float noise(float i, float f) {
    float u = f * (2.0 - 1.0 * f ); // custom cubic curve
    return mix(rand(i), rand(i + 1.0), u);
}
float noise(float x) {
    return noise(floor(x), fract(x));
}
float noise(vec2 i, vec2 f) {
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);
    // x*x*x*(x*(x*6.-15.)+10.)

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
float noise(vec2 coord) {
    return noise(floor(coord), fract(coord));
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

// main = 3 parts:
// init + set variables + set frag color
void main() {
    init();
    setVariables();
    setColor();
    gl_FragColor = vec4(color, 1.0);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

uniform vec2[${dotsCount}] u_dots;
#define dots_forEach for (int i = 0; i < u_dots.length(); i++)
#define _dot u_dots[i]

// CONSTANTS:

#define BLACK vec3(0.0)
#define WHITE vec3(1.0)

#define GRID_X_SIZE 10
#define GRID_Y_SIZE 10

// VARIABLES:

vec2 mPoint;
float mDist;

// FUNCTIONS:

void init() {
    coord = gl_FragCoord.xy / u_resolution.xy;
    color = WHITE;
    brush.opacity = 1.0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setVariables() {
    mDist = 1.0;
    dots_forEach {
        brush.opacity = 0.1;
        float d = distance(coord, _dot);
        if (d < mDist) {
            mDist = d;
            mPoint = _dot;
        }
    }
}

// index = [0, 1]

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

void setColor() {
    color = BLACK;
    color += vec3(1.0) * (step(0.01, length(mDist)));
}