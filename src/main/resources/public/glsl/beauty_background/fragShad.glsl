uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    UTIL FUNCTIONS
//

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

float random(float x) {
    return fract(sin(x) * 6543.6544);
}
float random(vec2 coord) {
    return fract(sin(dot(coord,vec2(12.9898, 78.233))) * 3425.5453);
}

float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

// Some useful functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {

    //
    //  Description : GLSL 2D simplex noise function
    //       Author : Ian McEwan, Ashima Arts
    //   Maintainer : ijm
    //      Lastmod : 20110822 (ijm)
    //      License :
    //   Copyright (C) 2011 Ashima Arts. All rights reserved.
    //   Distributed under the MIT License. See LICENSE file.
    //   https://github.com/ashima/webgl-noise
    //

    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                        -0.577350269189626,
                        0.024390243902439);

    // First corner (x0)
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    // Other two corners (x1, x2)
    vec2 i1 = vec2(0.0);
    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;

    // Do some permutations to avoid
    // truncation effects in permutation
    i = mod289(i);
    vec3 p = permute(
            permute( i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(
                        dot(x0,x0),
                        dot(x1,x1),
                        dot(x2,x2)
                        ), 0.0);

    m = m*m ;
    m = m*m ;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

    vec3 g = vec3(0.0);
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
    return 130.0 * dot(m, g);
}

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTANTS:

#define BLACK vec3(0.0)
#define WHITE vec3(1.0)

#define COL_1 vec3(1.,0.494,0.)
#define COL_2 vec3(1.,0.,0.004)
#define COL_3 vec3(1.,0.,0.506)

#define GRADIENT_COEF 0.2

#define NOISE_1_VEC_2 vec2(10.0, 10.0)
#define NOISE_2_VEC_2 vec2(2.0, 20.0)

#define WAVE_COMPONENTS_COUNT 4

// VARIABLES:

#define NUM_OCTAVES 4
#define DETAILS 10.0
#define SPEED 1.0

float fbm ( in vec2 st) {
    float v = 0.0;
    float a = 0.5;

    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(st);
        st *= 2.0;
        a *= 0.5;
    }
    return v;
}

vec3 color;
vec2 coord;

void init() {
    coord = gl_FragCoord.xy / u_resolution * DETAILS;
    color = WHITE;
}

float getFBMOpacity() {
    #define fbm_arr_foreach for (int i = 0; i < fbm_arr.length(); i++)
    #define _fbm fbm_arr[i]
    float[3] fbm_arr;

    coord.y -= u_time;

    fbm_arr[0] = fbm(coord);
    fbm_arr[1] = fbm(fbm_arr[0] + coord + u_time) - 0.2;
    fbm_arr[2] = fbm(fbm_arr[1] + coord) - 0.2;

    float opacity = 1.0;
    float weaking = 0.4;

    fbm_arr_foreach {
        opacity *= _fbm / weaking;
    }

    return opacity;
}

void setColor() {
    float opacity = getFBMOpacity();

    color = vec3(opacity);
}

void main() {
    init();
    setColor();
    gl_FragColor = vec4(color, 1.0);
}

