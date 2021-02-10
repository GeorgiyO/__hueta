export class GLSL {

    // language=GLSL
    static fragShadRadar = `
        
        #define BLACK vec3(0.0)
        #define WHITE vec3(1.0)
        #define GRAY vec3(0.1)
        
        #define BLUE vec3(0.212,0.775,1.0)
        #define RED vec3(0.961,0.139,0.043)

        #define PI_1_4 0.78539816339
        #define PI_1_3 1.0471975512
        #define PI_1_2 1.57079632679
        #define PI_2_3 2.09439510239
        #define PI_7_6 3.66519142919
        #define PI 3.14159265359
        #define PI_2_1 6.28318530718
        
        #define LINE_ANGLE u_time * 2.0

        uniform vec2 u_resolution;
        uniform float u_time;
        
        struct Brush {
            vec3 color;
            float opacity;
        } brush;
        
        struct Ring {
            vec2 center;
            float r;
            float width;
        };

        struct Rect {
            vec2 center;
            float width;
            float height;
            float rot;
        };

        struct Cross {
            vec2 center;
            float length;
            float width;
            float rot;
        };
        
        struct Equilateral {
            int n;
            vec2 center;
            vec2 size;
            float rot;
        };

        vec2 coord;
        vec3 color;

        float gradient = 0.0;
        
        // util functions:
        
        void draw(bool b) {if (b) color = mix(color, brush.color, brush.opacity);}
        
        void rotate(float angle) {
            coord *= mat2(
                cos(angle),-sin(angle),
                sin(angle), cos(angle)
            );
        }
        
        void move(vec2 where) {
            coord += where;
        }
        
        void resize(vec2 scale) {
            coord /= scale;
        }
        
        void resize(float scale) {
            coord /= scale;
        }

        float random (in vec2 st) {
            return 
            fract(
                sin(
                    dot(
                        st.xy, vec2(12.9898,78.233)
                    )
                ) * 43758.5453123
            );
        }
        
        float noise() {
            return 0.0;
        }

        void init() {
            coord = gl_FragCoord.xy / u_resolution.xy;
            coord = coord * 2.0 - 1.0;
            color = vec3(0.0);
        }

        void setColor();

        bool getRing(in Ring ring);
        bool getRect(in Rect rect);
        bool _getRect(in Rect rect);
        bool getCross(in Cross cross);
        bool getEquilateral(in Equilateral eq);
        
        void drawRings();
        void drawCross();
        void drawTriangles();
        void drawBorder();
        void drawLine();
        void drawWhiteDots();
        void drawRedDot();

        void main() {
            init();
            setColor();
            gl_FragColor = vec4(color, 1.0);
        }

        void setColor() {
            drawCross();
            drawRings();
            drawTriangles();
            drawBorder();
            drawLine();
            drawWhiteDots();
            drawRedDot();
        }
        
        void drawRings() {
            brush.color = mix(BLUE, vec3(1.0), 0.5);
            brush.opacity = 0.7;
            
            Ring proto = Ring(
                vec2(0.0),
                0.0,
                0.003
            );

            proto.r = 0.20;
            draw(getRing(proto));

            proto.r = 0.375;
            draw(getRing(proto));
            
            proto.r = 0.03;
            brush.color = BLUE;
            draw(getRing(proto));
            
            proto.r = 0.55;
            proto.width = 0.0045;
            
            brush.opacity = 1.0;
            brush.color = WHITE;
            draw(getRing(proto));
        }
        
        void drawCross() {
            brush.color = WHITE;
            brush.opacity = 0.2;
            draw(getCross(
                Cross(
                    vec2(0.0),
                    0.55,
                    0.005,
                    PI_1_4
                )
            ));
        }
        
        void drawTriangles() {
            brush.color = WHITE;
            brush.opacity = 0.7;
            
            Equilateral proto = Equilateral(
                3,
                vec2(0.8 + sin(u_time) / 20.0, 0.0),
                vec2(0.02, 0.04),
                PI_1_2
            );
            
            draw(getEquilateral(proto));
            
            proto.center.x = -proto.center.x;
            proto.rot = -proto.rot;
            
            draw(getEquilateral(proto));
        }
        
        void drawBorder() {
            brush.color = WHITE;
            brush.opacity = 0.9;
            
            Equilateral proto = Equilateral(
                8,
                vec2(0.0),
                vec2(1.3),
                PI / 8.0
            );
            
            bool b1 = getEquilateral(proto);
            
            proto.size += 0.015;
            
            bool b2 = getEquilateral(proto);
            
            float a = atan(coord.y, coord.x);
            float f = step(0.7, cos(a * 8.0));
            bool b3 = f == 1.0;
            
            // !b1 && b2 = octagon; b3 = angles
            draw(!b1 && b2 && b3);
        }
        
        void drawLine() {
            
            brush.color = BLUE;
            brush.opacity = 1.0;
            
            Rect line = Rect(
                vec2(0.0, 0.275),
                0.005,
                0.55,
                LINE_ANGLE
            );
            
            rotate(line.rot);
            
            draw(_getRect(line));
            
            brush.opacity = 0.7;
            
            if (distance(vec2(0.0), coord) < 0.55) {
                
                rotate(PI_7_6);
                
                float a1 = atan(coord.y, coord.x);
                a1 = 0.5 - a1 / PI_2_3;
                float _gradient = clamp(a1, 0.0, 1.0);

                if (_gradient < 1.0) {
                    gradient = _gradient;
                    brush.opacity = 0.8 * gradient;
                    color = mix(color, brush.color, brush.opacity);
                }
                
                rotate(-PI_7_6);
            }
            
            rotate(-line.rot);
        }
        
        void drawWhiteDots() {

            brush.color = WHITE;
            brush.opacity = gradient;

            float _uTime = u_time / 20.0;

            vec2 center = vec2(sin(_uTime), cos(_uTime)) * 0.3;
            vec2 offset = vec2(cos(_uTime * 3.0), sin(_uTime * 8.0)) * 0.1;

            draw(step(distance(center + offset, coord), 0.01) == 1.0);

            center = vec2(cos(_uTime * 3.0), sin(_uTime * 4.0)) * 0.4;
            offset = vec2(sin(_uTime), cos(_uTime)) * 0.1;

            draw(step(distance(center + offset, coord), 0.01) == 1.0);
        }
        
        void drawRedDot() {
            
            brush.color = RED;
            brush.opacity = gradient;
            
            float _uTime = u_time / PI_2_1;
            
            vec2 center = vec2(sin(_uTime), cos(_uTime)) * 0.2;
            vec2 offset = vec2(sin(_uTime / 4.0), cos(u_time / 3.0) * 1.3) * 0.1;
            vec2 dotCenter = center + offset;
            
            draw(step(sin(u_time * 30.0), 0.5) == 1.0 && step(distance(dotCenter, coord), 0.015) == 1.0);
            
            float dist = distance(vec2(0.0), dotCenter);
            float da = -atan(dotCenter.y, dotCenter.x) + PI_1_2;
            
            Ring ring = Ring(
                vec2(dist * sin(da), dist * cos(da)),
                0.025,
                0.005
            );
            
            draw(getRing(ring));
            
            float _pingTime = LINE_ANGLE + atan(dotCenter.y, dotCenter.x) - PI_1_2;
            
            ring.r = mod(_pingTime, PI_2_1) / PI_2_1;
            brush.opacity = pow(clamp(1.0 - ring.r * 4.0, 0.0, 1.0), 0.8);
            
            ring.r;
            
            draw(getRing(ring));
        }

        bool getRing(in Ring ring) {
            float d1 = step(ring.r, distance(ring.center, coord));
            float d2 = step(distance(ring.center, coord), ring.r + ring.width);
            return d2 == d1;
        }

        bool getRect(in Rect rect) {

            rotate(rect.rot);

            float dw = rect.width / 2.0;
            float dh = rect.height / 2.0;
            float rx = rect.center.x;
            float ry = rect.center.y;

            float l = step(rx - dw, coord.x);
            float r = 1.0 - step(rx + dw, coord.x);
            float t = step(ry - dh, coord.y);
            float b = 1.0 - step(ry + dh, coord.y);

            float res = l * r * b * t;

            rotate(-rect.rot);

            return res == 1.0;
        }

        bool _getRect(in Rect rect) {

            // rotate(rect.rot);

            float dw = rect.width / 2.0;
            float dh = rect.height / 2.0;
            float rx = rect.center.x;
            float ry = rect.center.y;

            float l = step(rx - dw, coord.x);
            float r = 1.0 - step(rx + dw, coord.x);
            float t = step(ry - dh, coord.y);
            float b = 1.0 - step(ry + dh, coord.y);

            float res = l * r * b * t;

            // rotate(rect.rot);

            return res == 1.0;
        }

        bool getCross(in Cross cross) {
            
            rotate(cross.rot);
            
            float doubleLength = cross.length * 2.0;
            
            Rect proto = Rect(cross.center, doubleLength, cross.width, 0.0);
            bool r1 = _getRect(proto);

            proto.height = proto.width;
            proto.width = cross.width;
            bool r2 = _getRect(proto);
            
            rotate(-cross.rot);
            
            return r1 || r2;
        }

        bool getEquilateral(in Equilateral eq) {

            move(eq.center);
            resize(eq.size);
            rotate(eq.rot);
            
            float a = atan(coord.x, coord.y) + PI;
            float b = PI_2_1 / float(eq.n);
            float res = step(cos(floor(0.5 + a / b) * b - a) * length(coord), 0.5);

            rotate(-eq.rot);
            resize(1.0 / eq.size);
            move(-eq.center);
            
            return res == 1.0;
        }
    `;
}