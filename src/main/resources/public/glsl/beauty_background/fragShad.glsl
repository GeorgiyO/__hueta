uniform vec3 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    // Smooth Interpolation
    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);
    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 6
float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    _st = rotate2D(_st, 0.500);
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

#define white vec3(1.0);
#define black vec3(1.0);
#define DWX 0.5

#define COL_1 vec3(-1.5)

#define COL_2 vec3(1.501, 0.0, -0.985)
#define COL_3 vec3(-1.0, 0.0, 2.985)

#define SPEED_1 0.5
#define SPEED_2 -0.4
#define SPEED_3 -0.3

vec3 color;
vec2 coord;

void init() {
    coord = gl_FragCoord.xy / u_resolution.z * 5.0 + 1.0;
}

void draw() {
    vec2 w = vec2(0.0);
    vec2 b = vec2(0.0);
    
    b.x = fbm(coord + DWX * u_time * SPEED_1);
    b.y = fbm(coord + vec2(2.0));

    w.x = fbm(coord + 0.5 * b + vec2(4.0) + SPEED_2 * u_time);
    w.y = fbm(coord + 1.0 * b + vec2(10.0) + SPEED_3 * u_time);
    
    float f = fbm(coord + w);
    
    float cmv_1 = pow(f, 2.0) * 4.0;
    float cmv_2 = length(w) * f;

    color = mix(COL_1, COL_2, cmv_1);
    color = mix(color, COL_3, cmv_2);

    color = (pow(f, 3.0) + pow(f, 2.0) + f) * color;

    gl_FragColor = vec4(color, 1.0);
}

void main() {
    init();
    draw();
}