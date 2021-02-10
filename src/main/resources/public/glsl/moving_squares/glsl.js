export class GLSL {

    // language=GLSL
    static fragShad = `

        uniform vec2 u_resolution;
        uniform float u_time;
        
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

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //    INTERFACE
        //

        void init();
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        void setVariables();
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        void setColor();
        void drawMain();
        void drawGrid();
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //    MAIN CODE
        //
        
        // STRUCTS:
        
        struct Rect {
            vec2 center;
            float width;
            float height;
        };
        
        float getRect(vec2 coord, in Rect rect, float smoothing) {
            
            vec2 r_lb = rect.center - vec2(rect.width, rect.height) / 2.0;

            float l = smoothstep(coord.x, coord.x - smoothing, r_lb.x);
            float r = smoothstep(coord.x, coord.x + smoothing, r_lb.x + rect.width);
            float b = smoothstep(coord.y, coord.y - smoothing, r_lb.y);
            float t = smoothstep(coord.y, coord.y + smoothing, r_lb.y + rect.height);
            
            return l * r * b * t;
        }
            
        struct Circle {
            vec2 center;
            float radius;
        };
        
        float getCircle(vec2 coord, in Circle circle, float smoothing) {
            float d = distance(coord, circle.center);
            return smoothstep(d, d + smoothing, circle.radius);
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
        
        // VARIABLES:

        vec2 mainCoord;
        vec2 gridCoord;
        vec2 gridCoord_2;
        
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
            mainCoord = coord * 2.0 - 1.0;
            
            gridCoord = coord * 20.0;
            if (mod(u_time, 2.0) > 1.0) {
                gridCoord.x += fract(step(1.0, mod(gridCoord.y, 2.0)) * u_time * 2.0);
                gridCoord.x -= u_time;
            } else {
                gridCoord.y += fract(step(1.0, mod(gridCoord.x, 2.0)) * u_time * 2.0);
                gridCoord.y -= u_time;
            }
            gridCoord = fract(gridCoord);
            gridCoord = gridCoord * 2.0 - 1.0;
        }
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        void setColor() {
            drawGrid();
        }
        
        void drawMain() {
            
        }
        
        void drawGrid() {
            brush.color = BLACK;
            brush.opacity = getRect(
                gridCoord,
                Rect(
                    vec2(0.0),
                    0.8,
                    0.4
                ),
                0.1
            );
            draw();
        }
        
    `;
}