export type MarqueeOptions = {
  baseVelocity?: number
  slowDownFactor?: number
  dragSensitivity?: number
  tileWidth?: number
  gap?: number
}

function wrap(min: number, max: number, value: number): number {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

function buildGentlePath(width: number, midY: number): string {
  // Mild vertical variation (~10px) so the band stays calm
  const y1 = midY - 8
  const y2 = midY + 8
  const x1 = width * 0.25
  const x2 = width * 0.5
  const x3 = width * 0.75
  return `M 0 ${midY} C ${x1} ${y1} ${x2} ${y2} ${x3} ${midY} S ${width} ${y1} ${width} ${midY}`
}

export function initMarqueeAlongPath(root: HTMLElement, options: MarqueeOptions = {}): () => void {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reducedMotion) {
    root.classList.add("embassy-marquee--static")
    return () => {}
  }

  const stage = root.querySelector<HTMLElement>(".embassy-marquee__stage")
  const track = root.querySelector<HTMLElement>(".embassy-marquee__track")
  const svg = root.querySelector<SVGElement>(".embassy-marquee__svg")
  const svgPath = root.querySelector<SVGPathElement>(".embassy-marquee__svg path")
  if (!stage || !track) return () => {}

  const items = [...track.querySelectorAll<HTMLElement>("[data-marquee-item]")]
  if (items.length === 0) return () => {}

  // Velocity is px/sec along the path (not % of a viewport-fitted path)
  const baseVelocityPx = options.baseVelocity ?? 45
  const slowDownFactor = options.slowDownFactor ?? 0.3
  const dragSensitivity = options.dragSensitivity ?? 0.15
  const tileW = options.tileWidth ?? 200
  const gap = options.gap ?? 16
  const tileH = tileW * (13 / 9)
  const stride = tileW + gap
  const pathW = items.length * stride
  const pathH = Math.ceil(tileH + 48)
  const midY = pathH / 2
  const pathD = buildGentlePath(pathW, midY)
  const pathCss = `path('${pathD}')`

  stage.style.width = `${pathW}px`
  stage.style.height = `${pathH}px`

  if (svg) {
    svg.setAttribute("viewBox", `0 0 ${pathW} ${pathH}`)
    svg.setAttribute("width", String(pathW))
    svg.setAttribute("height", String(pathH))
  }
  if (svgPath) {
    svgPath.setAttribute("d", pathD)
  }

  for (const item of items) {
    item.style.width = `${tileW}px`
    item.style.height = `${tileH}px`
    item.style.offsetPath = pathCss
    item.style.offsetAnchor = "center"
    item.style.offsetRotate = "0deg"
    item.style.willChange = "offset-distance"
  }

  let baseOffset = 0
  let isHovered = false
  let isDragging = false
  let lastPointerX = 0
  let dragVelocity = 0
  let rafId = 0
  let lastTime = 0

  // Start the path off-screen to the left so tiles are fully formed
  // before they enter the visible area (pairs with the CSS edge fade).
  const edgePad = tileW * 0.6

  const updateLayout = () => {
    const ch = root.clientHeight
    // Center the path band even when taller than the container so any
    // clipping is shared equally above and below the tiles.
    const ty = (ch - pathH) / 2
    stage.style.transform = `translate(${-edgePad}px, ${ty}px)`
  }

  const updateItems = () => {
    const total = items.length
    items.forEach((item, index) => {
      const position = (index * 100) / total
      const distance = wrap(0, 100, baseOffset + position)
      item.style.offsetDistance = `${distance}%`
    })
  }

  const tick = (time: number) => {
    const delta = lastTime === 0 ? 0 : time - lastTime
    lastTime = time

    // Convert px motion into % of path length
    const pxToPercent = 100 / pathW

    if (isDragging) {
      baseOffset = wrap(0, 100, baseOffset + dragVelocity * pxToPercent)
      dragVelocity *= 0.9
      if (Math.abs(dragVelocity) < 0.01) dragVelocity = 0
    } else {
      const hoverFactor = isHovered ? slowDownFactor : 1
      const movePx = baseVelocityPx * (delta / 1000) * hoverFactor
      baseOffset = wrap(0, 100, baseOffset + movePx * pxToPercent)
    }

    updateItems()
    rafId = requestAnimationFrame(tick)
  }

  const onPointerDown = (e: PointerEvent) => {
    isDragging = true
    dragVelocity = 0
    lastPointerX = e.clientX
    root.setPointerCapture(e.pointerId)
    root.classList.add("embassy-marquee--dragging")
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - lastPointerX
    lastPointerX = e.clientX
    dragVelocity = dx * dragSensitivity * 8
  }

  const onPointerUp = (e: PointerEvent) => {
    if (!isDragging) return
    isDragging = false
    root.releasePointerCapture(e.pointerId)
    root.classList.remove("embassy-marquee--dragging")
  }

  const onEnter = () => {
    isHovered = true
  }
  const onLeave = () => {
    isHovered = false
  }

  updateLayout()
  updateItems()
  rafId = requestAnimationFrame(tick)

  const ro = new ResizeObserver(updateLayout)
  ro.observe(root)

  root.addEventListener("pointerdown", onPointerDown)
  root.addEventListener("pointermove", onPointerMove)
  root.addEventListener("pointerup", onPointerUp)
  root.addEventListener("pointercancel", onPointerUp)
  root.addEventListener("mouseenter", onEnter)
  root.addEventListener("mouseleave", onLeave)

  return () => {
    cancelAnimationFrame(rafId)
    ro.disconnect()
    root.removeEventListener("pointerdown", onPointerDown)
    root.removeEventListener("pointermove", onPointerMove)
    root.removeEventListener("pointerup", onPointerUp)
    root.removeEventListener("pointercancel", onPointerUp)
    root.removeEventListener("mouseenter", onEnter)
    root.removeEventListener("mouseleave", onLeave)
    for (const item of items) {
      item.style.willChange = ""
    }
  }
}
