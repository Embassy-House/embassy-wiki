import { initMarqueeAlongPath } from "../marquee-along-path"

document.addEventListener("nav", () => {
  const cleanups: Array<() => void> = []

  document.querySelectorAll<HTMLElement>("[data-photo-marquee]").forEach((root) => {
    const baseVelocity = Number(root.dataset.baseVelocity ?? "45")
    const slowDownFactor = Number(root.dataset.slowdownFactor ?? "0.3")
    const dragSensitivity = Number(root.dataset.dragSensitivity ?? "0.15")
    const tileWidth = Number(root.dataset.tileWidth ?? "200")
    const gap = Number(root.dataset.gap ?? "16")

    const cleanup = initMarqueeAlongPath(root, {
      baseVelocity,
      slowDownFactor,
      dragSensitivity,
      tileWidth,
      gap,
    })
    cleanups.push(cleanup)
  })

  window.addCleanup(() => {
    for (const cleanup of cleanups) cleanup()
  })
})
