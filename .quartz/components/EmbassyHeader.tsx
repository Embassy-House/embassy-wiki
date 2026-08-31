import { joinSegments, pathToRoot } from "../quartz/util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"

const EmbassyHeader: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? "index"
  const bannerSrc = joinSegments(pathToRoot(slug), "static/embassy-banner.png")

  return (
    <header class="embassy-header">
      <img class="embassy-header__banner" src={bannerSrc} alt="" aria-hidden="true" width={1200} height={400} />
      <div class="embassy-header__inner">
        <a href="/" class="embassy-header__wordmark">
          The Embassy
        </a>
      </div>
    </header>
  )
}

export default (() => EmbassyHeader) satisfies QuartzComponentConstructor
