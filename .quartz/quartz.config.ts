import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import EmbassyPageBody from "./components/EmbassyPageBody"

/**
 * Meridian-Quartz Configuration
 *
 * Key differences from vanilla Quartz:
 * - Content sourced from parent directory (workspace root)
 * - Meridian-specific ignore patterns
 * - Pre-configured for .quartz/ installation location
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Embassy",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: process.env.QUARTZ_BASE_URL ?? "wiki.embassy.community",
    ignorePatterns: [
      // Quartz infrastructure
      ".quartz/**",
      ".quartz-cache/**",

      // Meridian infrastructure
      ".meridian/**",

      // Development infrastructure
      ".github/**",
      ".git/**",
      ".gitignore",
      "node_modules/**",
      "package*.json",
      "yarn.lock",
      "tsconfig*.json",
      "*.config.{js,ts}",
      "vite.config.{js,ts}",
      "rollup.config.{js,ts}",
      "webpack.config.{js,ts}",

      // Build and temporary
      "dist/**",
      "build/**",
      "cache/**",
      "*.log",
      "tmp/**",
      "temp/**",
      ".cache/**",

      // IDE and system
      ".vscode/**",
      ".idea/**",
      "*.swp",
      "*.swo",
      ".DS_Store",
      "Thumbs.db",

      // Backup files
      "*~",
      "*.bak",
      "*.tmp",

      // Private content
      "private/**",
      "templates/**",
      ".obsidian/**",

      // Common documentation that shouldn't be published
      "CHANGELOG.md",
      "CONTRIBUTING.md",
      "INSTALL.md",
      "TODO.md",
      "ROADMAP.md",
    ],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Libre Caslon Display",
        header: "Libre Caslon Display",
        body: "Archivo",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#F7F2EA",
          lightgray: "rgba(36,10,30,0.16)",
          gray: "rgba(36,10,30,0.55)",
          darkgray: "rgba(36,10,30,0.78)",
          dark: "#240A1E",
          secondary: "#7C33E0",
          tertiary: "#FF4FA3",
          highlight: "rgba(124,51,224,0.08)",
          textHighlight: "rgba(124,51,224,0.15)",
        },
        darkMode: {
          light: "#F7F2EA",
          lightgray: "rgba(36,10,30,0.16)",
          gray: "rgba(36,10,30,0.55)",
          darkgray: "rgba(36,10,30,0.78)",
          dark: "#240A1E",
          secondary: "#7C33E0",
          tertiary: "#FF4FA3",
          highlight: "rgba(124,51,224,0.08)",
          textHighlight: "rgba(124,51,224,0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "filesystem"] }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage({ pageBody: EmbassyPageBody() }),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
