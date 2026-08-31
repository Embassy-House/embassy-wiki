import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")
const src = path.join(root, ".quartz/public")
const dest = path.join(root, "..", "embassy-website")

const rootFiles = ["index.html", "index.css", "prescript.js", "postscript.js", "404.html"]

const staticFiles = [
  "static/icon.png",
  "static/og-image.png",
  "static/embassy-banner.png",
  "static/embassy-house-drawing.png",
  "static/contentIndex.json",
  "static/fonts/catchy-mager.woff2",
]

const photos = [
  "hero-bedroom.jpg",
  "kitchen-cheers.jpg",
  "parlor-dance.jpg",
  "sofa-teal.jpg",
  "window-wave.jpg",
  "windowsill-plants.jpg",
  "p03.jpg",
  "p06.jpg",
  "p07.jpg",
  "p08.jpg",
  "p09.jpg",
  "p10.jpg",
  "p11.jpg",
  "p12.jpg",
]

async function copyFile(from, to) {
  await fs.mkdir(path.dirname(to), { recursive: true })
  await fs.copyFile(from, to)
}

async function main() {
  for (const file of rootFiles) {
    await copyFile(path.join(src, file), path.join(dest, file))
  }

  for (const file of staticFiles) {
    await copyFile(path.join(src, file), path.join(dest, file))
  }

  for (const photo of photos) {
    await copyFile(path.join(src, "static/photos", photo), path.join(dest, "static/photos", photo))
  }

  console.log(`Synced landing page build to ${dest}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
