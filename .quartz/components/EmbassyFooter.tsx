import { pathToRoot, joinSegments } from "../quartz/util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"

const footerLinks = [
  { label: "Instagram", href: "https://www.instagram.com/embassy.sf" },
  { label: "Luma", href: "https://luma.com/embassy_sf" },
  { label: "Medium", href: "https://medium.com/embassy-network" },
  { label: "Merch", href: "https://embassy-house-shop.fourthwall.com/" },
]

const EmbassyFooter: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  const drawingSrc = joinSegments(baseDir, "static/embassy-house-drawing.png")

  return (
    <footer class="embassy-footer">
      <div class="embassy-footer__dots" aria-hidden="true"></div>
      <div class="embassy-footer__grid">
        <div class="embassy-footer__brand">
          <div class="embassy-footer__wordmark">The Embassy</div>
          <p class="embassy-footer__tagline">
            A commons in San Francisco, twelve years in and still being renegotiated.
          </p>
          <p class="embassy-footer__contact">
            Contact:{" "}
            <a href="mailto:embassy.house.sf@gmail.com">embassy.house.sf@gmail.com</a>
          </p>
        </div>
        <div class="embassy-footer__links">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <img
        class="embassy-footer__drawing"
        src={drawingSrc}
        alt=""
        aria-hidden="true"
        width={640}
        height={720}
        loading="lazy"
      />
    </footer>
  )
}

export default (() => EmbassyFooter) satisfies QuartzComponentConstructor
