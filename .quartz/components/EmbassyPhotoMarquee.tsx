import { joinSegments, pathToRoot } from "../quartz/util/path"

export const MARQUEE_REPEAT = 1

export const MARQUEE_PHOTOS: { name: string; alt: string }[] = [
  { name: "window-wave", alt: "A resident waving from an upstairs window" },
  { name: "p06", alt: "The Victorian facade" },
  { name: "p12", alt: "The dining room" },
  { name: "parlor-dance", alt: "Life in the house" },
  { name: "windowsill-plants", alt: "Life in the house" },
  { name: "sofa-teal", alt: "Life in the house" },
  { name: "kitchen-cheers", alt: "Residents in the kitchen" },
  { name: "p03", alt: "Life in the house" },
  { name: "p07", alt: "Life in the house" },
  { name: "p08", alt: "Life in the house" },
  { name: "p09", alt: "Life in the house" },
  { name: "p10", alt: "Life in the house" },
  { name: "p11", alt: "Life in the house" },
]

function photoUrl(slug: string, name: string) {
  return joinSegments(pathToRoot(slug), `static/photos/${name}.jpg`)
}

type EmbassyPhotoMarqueeProps = {
  slug: string
}

export function EmbassyPhotoMarquee({ slug }: EmbassyPhotoMarqueeProps) {
  const tiles = Array.from({ length: MARQUEE_REPEAT }, (_, repeatIndex) =>
    MARQUEE_PHOTOS.map((photo) => ({ ...photo, repeatIndex })),
  ).flat()

  return (
    <section
      class="embassy-marquee"
      data-photo-marquee=""
      data-base-velocity="45"
      data-slowdown-factor="0.3"
      data-drag-sensitivity="0.15"
      data-tile-width="200"
      data-gap="16"
      aria-label="Photos from life in the house"
    >
      <div class="embassy-marquee__stage">
        <svg class="embassy-marquee__svg" aria-hidden="true">
          <path fill="none" />
        </svg>
        <div class="embassy-marquee__track">
          {tiles.map((photo) => {
            const hidden = photo.repeatIndex > 0
            return (
              <div
                class="embassy-marquee__item"
                data-marquee-item=""
                key={`${photo.repeatIndex}-${photo.name}`}
                aria-hidden={hidden ? "true" : undefined}
              >
                <img
                  src={photoUrl(slug, photo.name)}
                  alt={hidden ? "" : photo.alt}
                  draggable={false}
                  loading={photo.repeatIndex === 0 ? "eager" : "lazy"}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
