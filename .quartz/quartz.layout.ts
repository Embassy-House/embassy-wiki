import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzComponent, QuartzComponentProps } from "./quartz/components/types"
import EmbassyHeader from "./components/EmbassyHeader"
import EmbassyFooter from "./components/EmbassyFooter"

const notIndex = (page: QuartzComponentProps) => page.fileData.slug !== "index"

function hideOnIndex(component: QuartzComponent) {
  return Component.ConditionalRender({
    component,
    condition: notIndex,
  })
}

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [EmbassyHeader()],
  afterBody: [],
  footer: EmbassyFooter(),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    hideOnIndex(Component.Breadcrumbs()),
    hideOnIndex(Component.ArticleTitle()),
    hideOnIndex(Component.ContentMeta()),
    hideOnIndex(Component.TagList()),
  ],
  left: [
    hideOnIndex(Component.PageTitle()),
    hideOnIndex(Component.MobileOnly(Component.Spacer())),
    hideOnIndex(
      Component.Flex({
        components: [
          {
            Component: Component.Search(),
            grow: true,
          },
          { Component: Component.Darkmode() },
          { Component: Component.ReaderMode() },
        ],
      }),
    ),
    hideOnIndex(Component.Explorer()),
  ],
  right: [
    hideOnIndex(Component.Graph()),
    hideOnIndex(Component.DesktopOnly(Component.TableOfContents())),
    hideOnIndex(Component.Backlinks()),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
