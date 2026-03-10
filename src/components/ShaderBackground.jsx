import React, { useEffect, useRef } from "react";

const ShaderBackground = () => {
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
      uniform float uTime;
      uniform vec2 uResolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        float time = uTime * 0.15;
        
        vec3 col1 = vec3(0.02, 0.03, 0.07);
        vec3 col2 = vec3(0.1, 0.3, 0.7);
        vec3 col3 = vec3(1.0, 0.6, 0.0);
        vec3 col4 = vec3(1.0, 0.8, 0.2);
        
        float n = sin(uv.x * 2. + time) * cos(uv.y * 3. - time * 0.5);
        n += sin(uv.y * 1.5 + time * 0.8) * cos(uv.x * 2.5 + time);
        
        vec3 finalCol = mix(col1, col2, 0.4 + 0.4 * n);
        finalCol = mix(finalCol, col3, 0.2 * abs(sin(time + uv.y)));
        finalCol = mix(finalCol, col4, 0.1 * abs(cos(time * 0.8 + uv.x)));
        
        float glow = 0.05 / length(uv - vec2(0.5 + 0.2*sin(time), 0.5 + 0.2*cos(time)));
        finalCol += glow * col4 * 0.5;

        gl_FragColor = vec4(finalCol, 1.0);
      }
    `;

    const loadShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, loadShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(shaderProgram, loadShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(shaderProgram, "uTime");
    const uResolution = gl.getUniformLocation(shaderProgram, "uResolution");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const render = (time) => {
      gl.useProgram(shaderProgram);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-15] pointer-events-none"
    />
  );
};

export default ShaderBackground;
