import { joinSegments, pathToRoot } from "../quartz/util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../quartz/components/types"
import { EmbassyPhotoMarquee } from "./EmbassyPhotoMarquee"

// @ts-ignore
import marqueeScript from "./scripts/marquee-along-path.inline"
// @ts-ignore
import revealScript from "./scripts/embassy-home-reveal.inline"

const NUM = ["01", "02", "03", "04"]

type ValueItem = {
  title?: string
  text?: string
}

function photoUrl(slug: string, name: string) {
  return joinSegments(pathToRoot(slug), `static/photos/${name}.jpg`)
}

function parseMission(mission: string | undefined) {
  if (!mission) {
    return { leadLines: [] as string[], rest: "" }
  }
  const paras = mission
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
  return {
    leadLines: (paras[0] ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    rest: paras
      .slice(1)
      .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
      .join(" "),
  }
}

const EmbassyHome: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const fm = fileData.frontmatter ?? {}
  const slug = fileData.slug!
  const { leadLines: missionLeadLines, rest: missionRest } = parseMission(
    fm.mission as string | undefined,
  )
  const values = (fm.values as ValueItem[] | undefined) ?? []
  const heroPretitle = (fm.hero_pretitle as string | undefined) ?? "Welcome to"
  const heroTitle = (fm.hero_title as string | undefined) ?? "the embassy"
  const heroSubtitle =
    (fm.hero_subtitle as string | undefined) ??
    (fm.kicker as string | undefined) ??
    "commune | experimental space | home"

  return (
    <article class="embassy-home">
      <div class="embassy-home__bg" aria-hidden="true">
        <div class="embassy-home__blob embassy-home__blob--a"></div>
        <div class="embassy-home__blob embassy-home__blob--b"></div>
        <div class="embassy-home__blob embassy-home__blob--c"></div>
        <div class="embassy-home__blob embassy-home__blob--d"></div>
        <div class="embassy-home__dots"></div>
      </div>

      <main class="embassy-home__main">
        <section class="embassy-home__hero">
          <div class="embassy-home__hero-copy">
            <p class="embassy-home__hero-pretitle">{heroPretitle}</p>
            <h1 class="embassy-home__hero-title">{heroTitle}</h1>
            <p class="embassy-home__hero-subtitle">{heroSubtitle}</p>
          </div>
        </section>

        <EmbassyPhotoMarquee slug={slug} />

        <section class="embassy-home__section embassy-home__mission">
          <div class="embassy-home__mission-inner">
            <h2 class="embassy-home__mission-lead">
              {missionLeadLines.map((line) => (
                <span class="embassy-home__mission-line" key={line}>
                  {line}
                </span>
              ))}
            </h2>
            {missionRest && <p class="embassy-home__mission-rest">{missionRest}</p>}
          </div>
        </section>

        <section class="embassy-home__section">
          <div class="embassy-home__stats" data-reveal="">
            <div class="embassy-home__stat">
              <div class="embassy-home__stat-value">{(fm.established as string) ?? "2013"}</div>
              <div class="embassy-home__stat-label">Established</div>
            </div>
            <div class="embassy-home__stat">
              <div class="embassy-home__stat-value">{(fm.residents as string | number) ?? "14"}</div>
              <div class="embassy-home__stat-label">Residents, roughly</div>
            </div>
            <div class="embassy-home__stat">
              <div class="embassy-home__stat-value">{(fm.years as string | number) ?? "12"}</div>
              <div class="embassy-home__stat-label">Years of continuous community</div>
            </div>
          </div>
        </section>

        <section class="embassy-home__section">
          <div class="embassy-home__split" data-reveal="">
            <h2 class="embassy-home__split-label">The house</h2>
            <div class="embassy-home__split-body">
              <p class="embassy-home__intro">
                {(fm.house_intro as string) ??
                  "A large San Francisco Victorian that has learned to hold twenty people."}
              </p>
            </div>
          </div>
        </section>

        <section class="embassy-home__section">
          <div class="embassy-home__split" data-reveal="">
            <h2 class="embassy-home__split-label">How we hold it</h2>
            <div class="embassy-home__values">
              {values.map((value, i) => (
                <div class="embassy-home__value-row" data-reveal="" key={value.title ?? i}>
                  <div class="embassy-home__value-num">{NUM[i] ?? String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3 class="embassy-home__value-title">{value.title}</h3>
                    <p class="embassy-home__value-text">{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section class="embassy-home__section">
          <div class="embassy-home__split" data-reveal="">
            <h2 class="embassy-home__split-label">Gathering</h2>
            <div class="embassy-home__split-body">
              <p class="embassy-home__intro">
                {(fm.gather_intro as string) ??
                  "Gatherings here are occasional and specific: a dinner, a salon, a work party, a party that spills onto the street."}
              </p>
              {fm.gather_detail && <p class="embassy-home__detail">{fm.gather_detail as string}</p>}
            </div>
          </div>
        </section>
      </main>
    </article>
  )
}

EmbassyHome.afterDOMLoaded = [marqueeScript, revealScript].join("\n")

export default (() => EmbassyHome) satisfies QuartzComponentConstructor
