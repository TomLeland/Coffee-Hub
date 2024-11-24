const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  
  void main() {
    v_texCoord = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform vec3 u_colors[8];
  uniform int u_colorCount;

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
    vec2 st = v_texCoord * 2.0 - 1.0;
    float time = u_time * 0.2;

    // Create wave effect
    float wave = 0.0;
    for(int i = 0; i < 3; i++) {
      float scale = 1.0 + float(i) * 2.0;
      float speed = 1.0 - float(i) * 0.2;
      wave += noise(vec2(
        st.x * scale + time * speed,
        st.y * scale - time * speed
      )) * (1.0 / pow(2.0, float(i)));
    }

    // Create color gradient based on wave
    vec3 color = u_colors[0];
    float step = 1.0 / float(u_colorCount - 1);
    
    for(int i = 1; i < 8; i++) {
      if(i >= u_colorCount) break;
      float t = wave - float(i) * step;
      color = mix(color, u_colors[i], smoothstep(-0.2, 0.2, t));
    }

    // Add subtle shimmer
    float shimmer = noise(st * 20.0 + time) * 0.05;
    color += shimmer;

    // Fade edges
    float fade = 1.0 - length(st);
    fade = smoothstep(0.0, 0.7, fade);

    gl_FragColor = vec4(color, fade * 0.95);
  }
`

function hexToRGB(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result 
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ]
    : [1, 1, 1]
}

function createShader(canvas: HTMLCanvasElement, colors: string[]) {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true
  })
  if (!gl) return { cleanup: () => {} }

  // Create vertex shader
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  if (!vertexShader) return { cleanup: () => {} }
  gl.shaderSource(vertexShader, vertexShaderSource)
  gl.compileShader(vertexShader)

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader))
    return { cleanup: () => {} }
  }

  // Create fragment shader
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  if (!fragmentShader) return { cleanup: () => {} }
  gl.shaderSource(fragmentShader, fragmentShaderSource)
  gl.compileShader(fragmentShader)

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader))
    return { cleanup: () => {} }
  }

  // Create and link program
  const program = gl.createProgram()
  if (!program) return { cleanup: () => {} }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking failed:', gl.getProgramInfoLog(program))
    return { cleanup: () => {} }
  }

  gl.useProgram(program)

  // Set up geometry
  const positions = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, 1,
  ])
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  const positionLocation = gl.getAttribLocation(program, "a_position")
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  // Set up uniforms
  const timeLocation = gl.getUniformLocation(program, "u_time")
  const colorsLocation = gl.getUniformLocation(program, "u_colors")
  const colorCountLocation = gl.getUniformLocation(program, "u_colorCount")

  // Convert colors to RGB values
  const colorValues = colors.map(hexToRGB).flat()
  gl.uniform3fv(colorsLocation, new Float32Array(colorValues))
  gl.uniform1i(colorCountLocation, colors.length)

  // Enable transparency
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  // Animation loop
  let startTime = Date.now()
  let animationFrame: number

  function render() {
    const time = (Date.now() - startTime) * 0.001
    gl.uniform1f(timeLocation, time)

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    animationFrame = requestAnimationFrame(render)
  }

  render()

  return {
    cleanup: () => {
      cancelAnimationFrame(animationFrame)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(positionBuffer)
    }
  }
}

export { createShader }