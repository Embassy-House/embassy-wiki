document.addEventListener("nav", () => {
  if (!("IntersectionObserver" in window)) return

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const el = e.target as HTMLElement
        el.style.opacity = "1"
        el.style.transform = "none"
        io.unobserve(el)
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
  )

  let i = 0
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => {
    const inView = n.getBoundingClientRect().top < window.innerHeight * 0.92
    n.style.transition = `opacity 800ms cubic-bezier(.22,.7,.3,1) ${(i % 4) * 70}ms, transform 800ms cubic-bezier(.22,.7,.3,1) ${(i % 4) * 70}ms`
    if (inView) {
      n.style.opacity = "1"
      n.style.transform = "none"
      return
    }
    n.style.opacity = "0"
    n.style.transform = "translateY(20px)"
    io.observe(n)
    i++
  })

  window.addCleanup(() => io.disconnect())
})
