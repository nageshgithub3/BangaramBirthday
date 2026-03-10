import React, { useEffect, useRef } from "react";

const ButterflyShader = () => {
    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl");

        if (!gl) return;

        const vsSource = `
            attribute vec4 aVertexPosition;
            void main() {
                gl_Position = aVertexPosition;
            }
        `;

        const fsSource = `
            precision highp float;
            uniform float iTime;
            uniform vec2 iResolution;
            uniform vec2 iMouse;

            mat3 rotx(float a) { return mat3(1.0, 0.0, 0.0, 0.0, cos(a), -sin(a), 0.0, sin(a), cos(a)); }
            mat3 roty(float a) { return mat3(cos(a), 0.0, sin(a), 0.0, 1.0, 0.0, -sin(a), 0.0, cos(a)); }
            mat3 rotz(float a) { return mat3(cos(a), -sin(a), 0.0, sin(a), cos(a), 0.0, 0.0, 0.0, 1.0); }

            float udBox(vec3 p, vec3 b) { return length(max(abs(p)-b,0.0)); }
            
            vec2 getModel(vec3 pos, float id) {
                float phase = id * 2.0;
                
                vec3 pBody = pos;
                pBody.z *= 0.5;
                float body = length(pBody) - 0.06;
                
                float flap = sin(iTime * 18.0 + phase) * 1.3;
                
                vec3 pL = pos - vec3(0.05, 0.0, 0.0);
                pL = rotz(flap) * pL;
                float w1 = udBox(pL - vec3(0.25, 0.0, 0.0), vec3(0.3, 0.005, 0.2));
                
                vec3 pR = pos + vec3(0.05, 0.0, 0.0);
                pR = rotz(-flap) * pR;
                float w2 = udBox(pR + vec3(0.25, 0.0, 0.0), vec3(0.3, 0.005, 0.2));
                
                float d = min(body, min(w1, w2));
                return vec2(d, d == body ? 0.0 : 1.0);
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution.xy;
                uv = uv * 2.0 - 1.0;
                uv.x *= iResolution.x / iResolution.y;

                vec3 ro = vec3(0.0, 0.0, 6.0);
                vec3 rd = normalize(vec3(uv, -1.8));
                
                vec2 m = iMouse.xy / iResolution.xy - 0.5;
                if(iMouse.x > 0.0) {
                   rd = rotx(m.y * 1.5) * roty(m.x * 1.5) * rd;
                   ro = rotx(m.y * 1.5) * roty(m.x * 1.5) * ro;
                }

                float t = 0.0;
                vec3 col = vec3(0.0);
                bool hit = false;
                
                for(int i = 0; i < 70; i++) {
                    vec3 p = ro + rd * t;
                    float minDist = 1e10;
                    float mID = 0.0;
                    
                    for(int j = 0; j < 15; j++) {
                        float fj = float(j);
                        float speed = 0.3 + fj * 0.1;
                        vec3 bPos = vec3(
                            sin(iTime * speed + fj * 1.5) * 4.0,
                            cos(iTime * speed * 0.8 + fj) * 3.0,
                            sin(iTime * 0.5 + fj * 2.0) * 2.5
                        );
                        vec2 res = getModel(p - bPos, fj);
                        if(res.x < minDist) {
                            minDist = res.x;
                            mID = res.y;
                        }
                    }
                    
                    if(minDist < 0.01) {
                        col = vec3(1.0, 0.8, 0.0);
                        if(mID > 0.5) {
                            col = mix(vec3(1.0, 0.2, 0.5), vec3(1.0, 0.8, 0.2), 0.5);
                            col *= 1.5 + 0.5 * sin(iTime * 5.0);
                        }
                        hit = true;
                        break;
                    }
                    t += minDist;
                    if(t > 20.0) break;
                }

                gl_FragColor = vec4(col, hit ? 1.0 : 0.0);
            }
        `;

        const loadShader = (type, source) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        };

        const program = gl.createProgram();
        gl.attachShader(program, loadShader(gl.VERTEX_SHADER, vsSource));
        gl.attachShader(program, loadShader(gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(program);
        gl.useProgram(program);

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        const pos = gl.getAttribLocation(program, "aVertexPosition");
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const uT = gl.getUniformLocation(program, "iTime");
        const uR = gl.getUniformLocation(program, "iResolution");
        const uM = gl.getUniformLocation(program, "iMouse");

        let mP = [0, 0];
        const onMouseMove = (e) => mP = [e.clientX, window.innerHeight - e.clientY];
        window.addEventListener("mousemove", onMouseMove);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        const render = (time) => {
            gl.useProgram(program);
            gl.uniform1f(uT, time * 0.001);
            gl.uniform2f(uR, canvas.width, canvas.height);
            gl.uniform2f(uM, mP[0], mP[1]);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            requestRef.current = requestAnimationFrame(render);
        };

        requestRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", handleResize);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-[-5] pointer-events-none"
            style={{ filter: "drop-shadow(0 0 20px rgba(255, 165, 0, 0.8))" }}
        />
    );
};

export default ButterflyShader;
