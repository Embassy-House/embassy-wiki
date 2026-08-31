import Content from "../quartz/components/pages/Content"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import EmbassyHome from "./EmbassyHome"

const EmbassyHomeComponent = EmbassyHome()
const ContentComponent = Content()

const EmbassyPageBody: QuartzComponent = (props: QuartzComponentProps) => {
  if (props.fileData.slug === "index") {
    return <EmbassyHomeComponent {...props} />
  }
  return <ContentComponent {...props} />
}

EmbassyPageBody.afterDOMLoaded = EmbassyHomeComponent.afterDOMLoaded

export default (() => EmbassyPageBody) satisfies QuartzComponentConstructor
