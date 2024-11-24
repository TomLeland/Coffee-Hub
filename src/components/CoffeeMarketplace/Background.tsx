import { useEffect, useRef } from 'react'

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float speed = 0.1;
    float scale = 2.0;
    
    float steamEffect = noise(vec2(st.x * scale, st.y * scale - u_time * speed));
    steamEffect += noise(vec2(st.x * scale * 2.0, st.y * scale * 2.0 - u_time * speed * 1.5)) * 0.5;
    
    vec3 bgColor = vec3(0.98, 0.97, 0.95);  // Warm cream base
    vec3 steamColor = vec3(0.97, 0.96, 0.94); // Slightly darker cream for contrast
    
    vec3 finalColor = mix(bgColor, steamColor, smoothstep(0.4, 0.6, steamEffect));
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const program = gl.createProgram()
    if (!program) return

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    if (!vertexShader) return
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragmentShader) return
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = [
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
    const timeUniformLocation = gl.getUniformLocation(program, "u_time")

    function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let startTime = Date.now()
    function render() {
      const time = (Date.now() - startTime) * 0.001
      gl.uniform1f(timeUniformLocation, time)
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  )
}