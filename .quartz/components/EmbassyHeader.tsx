import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"

const EmbassyHeader: QuartzComponent = () => {
  return (
    <header class="embassy-header">
      <div class="embassy-header__inner">
        <a href="/" class="embassy-header__wordmark">
          The Embassy
        </a>
      </div>
    </header>
  )
}

export default (() => EmbassyHeader) satisfies QuartzComponentConstructor
