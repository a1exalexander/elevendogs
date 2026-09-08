# 2026 Assets Implementation Plan

Plan for rolling out the new 2026 photo/logo assets (`src/assets/2026/`) across the site.

## New assets inventory

| Folder / file | Contents | Used for |
| --- | --- | --- |
| `src/assets/2026/logo_main.png` | Main logo, transparent background | Header logo, main location hero title |
| `src/assets/2026/logo_youngsters_text.png` | Youngsters text logo | Youngsters titles + header logo |
| `src/assets/2026/main/` (24 photos) | Main location photos | Main location gallery/hero/contact |
| `src/assets/2026/youngsters/` (13 photos) | Youngsters location photos | Youngsters gallery/hero/contact |
| `src/assets/2026/main_masters/` (`eugene.JPG`, `glib.jpg`, `ivan.JPG`) | Main masters portraits | Main "Майстри" section |
| `src/assets/2026/youngsters_masters/` (`dmytro.JPG`, `jaroslav.JPG`, `oleg.JPG`) | Youngsters masters portraits | Youngsters "Майстри" section |

## Affected files

- `pages/index.tsx` — root page (topbar logo, location cards)
- `pages/main.tsx` — main location page (asset imports, gallery, barber photos)
- `pages/youngsters.tsx` — youngsters page (asset imports, gallery, barber photos)
- `src/components/BarbershopPage/BarbershopPage.tsx` — shared location page template (header, hero, gallery, team, pricing, contacts)
- `src/components/BarbershopPage/BarbershopPage.module.scss` — styles (pricing layout, hero logo sizing)
- `styles/pages/index.module.scss` — root page styles
- `data.js` — masters names/roles/bios if they need to match the new photos

---

## 1. Update main header logo to `logo_main.png`

Current state: the header logo is `new_logo_2024.jpg` on the root page (`pages/index.tsx:8`) and on the main location page (`pages/main.tsx:5`), passed into `BarbershopPage` as the `logo` prop and rendered in `.brandLogo`.

Steps:
1. In `pages/index.tsx` replace `import logo from '../src/assets/new_logo_2024.jpg'` with `import logo from '../src/assets/2026/logo_main.png'`.
2. Same replacement in `pages/main.tsx`.
3. Since the new logo has a transparent background, check `.topbarLogo` (root) and `.brandLogo` (BarbershopPage) styles — remove any border-radius/background workarounds needed for the old JPG, and verify the logo is legible on both the light/dark header backgrounds; adjust height (`clamp`) if the new image has different aspect ratio.

## 2. Add/replace masters photos on each page

Current state: barber cards reuse gallery photos as placeholders (`barberPhotos` arrays in `pages/main.tsx:26` and `pages/youngsters.tsx:26`, mapped by index onto `locations.*.barbers` from `data.js`).

Steps:
1. In `pages/main.tsx` import the three portraits from `src/assets/2026/main_masters/` and map them by barber: Гліб → `glib.jpg`, Іван → `ivan.JPG`, Євгеній → `eugene.JPG`.
2. In `pages/youngsters.tsx` import from `src/assets/2026/youngsters_masters/`: Олег → `oleg.JPG`, Дмитро → `dmytro.JPG`, Ярослав → `jaroslav.JPG`.
3. Replace the index-based `barberPhotos[index % length]` mapping with an explicit photo per barber (e.g. add a `photo` key next to each entry, or a `photosById` map keyed by barber `id`) so the right face always matches the right name.
4. Check portrait crop in `.barberPhoto` (aspect ratio / `objectPosition`) — these are portrait phone photos, faces should not be cut off.

## 3. Replace all location photos with 2026 photos

Rule: keep only the root-level photos in `src/assets/` (e.g. `eleven_dogs*.png/svg`, icons, `shop-*.jpg`); all location photos come from `src/assets/2026/main/` and `src/assets/2026/youngsters/`, using **all** photos from each folder.

Steps:
1. `pages/main.tsx`: replace imports from `ed2/` and `new2025/` with imports of all 24 photos from `src/assets/2026/main/`. Pick one photo for `heroImage` and one for `contactImage`; the full set goes to `gallery`.
2. `pages/youngsters.tsx`: same with all 13 photos from `src/assets/2026/youngsters/` (`heroImage`, `contactImage`, full `gallery`).
3. `pages/index.tsx`: the location/education cards (`imageMain`, `imageSecondary`, `imageEducation`) also import from `ed2/` and `new2025/` — repoint them to suitable 2026 photos (main folder for the main + education cards, youngsters folder for the youngsters card).
4. After everything compiles, delete the now-unused old photo folders (`ed/`, `ed2/`, `edy/`, `edy2/`, `new2025/`, root `IMG_*`/`YAK*` files) — verify with a grep that nothing imports them (note `pages/education.tsx` → `EducationPage.tsx` may still use some; either keep those or repoint them too).
5. Mixed file extensions (`.JPG`, `.jpg`, `.PNG`) are case-sensitive in imports on Linux/Vercel — import with exact casing.
6. Photos are large phone originals — Next/Image with `sharp` handles resizing, but consider pre-compressing anything above ~4–5 MB to keep build time and repo size sane.

## 4. Gallery slider (carousel)

Current state: gallery is a static CSS grid (`.galleryGrid` in `BarbershopPage.tsx:263`) with a custom `Lightbox` on click.

Plan:
1. Add a carousel library — recommended: **`embla-carousel-react`** (small, no styling opinions, works well with Next.js; `keen-slider` or `swiper` are acceptable alternatives). `npm i embla-carousel-react`.
2. Create `src/components/GalleryCarousel/` that wraps Embla: horizontal slides, loop, prev/next arrows, drag/swipe on mobile, slide counter (`03 / 24`).
3. Replace `.galleryGrid` markup in `BarbershopPage.tsx` with the carousel; keep the click-to-open `Lightbox` integration (slide click → `setLightboxIndex`).
4. Style per variant: minimal (main) — restrained monochrome arrows; loud (youngsters) — youngsters accent colors ($Y_GREEN / $Y_YELLOW).
5. Keep `next/image` inside slides with proper `sizes`, `loading="lazy"` for non-visible slides.

## 5. Replace youngsters text title with `logo_youngsters_text.png` (root + youngsters page)

1. Root page (`pages/index.tsx:71`): replace the text `<div className={styles.cardNameYoung}>Youngsters</div>` with an `<Image src={logoYoungstersText} …>`; add an image style in `styles/pages/index.module.scss` (constrained width, responsive).
2. Youngsters location page: in `BarbershopPage.tsx:145-159` the `loud` variant renders the `Young<br/>sters` `<h1>`. Replace it for the loud variant with the `logo_youngsters_text.png` image (pass it via a new prop, e.g. `heroTitleImage`, from `pages/youngsters.tsx`). Keep an `<h1>` with visually-hidden text (existing `HiddenTitle` component) for SEO/a11y.

## 6. Replace "ELEVEN DOGS" title on main location page with `logo_main.png`

In the same hero block (`BarbershopPage.tsx:145-159`), the minimal variant renders `Eleven<br/>Dogs`. Replace it with `logo_main.png` via the same `heroTitleImage` prop from `pages/main.tsx`. Keep a visually-hidden `<h1>` for SEO. Note the hero already shows a `heroLogo` (`eleven_dogs.svg`) above the title — decide to drop the old `heroLogo` or the title slot to avoid two logos stacked; recommended: use `logo_main.png` as the single hero brand mark.

## 7. Replace header youngsters logo with `logo_youngsters_text.png`

`pages/youngsters.tsx:6` currently imports `eleven_dogs_logo_2_trimmed.png` as the header `logo`. Replace with `src/assets/2026/logo_youngsters_text.png`. Verify `.brandLogo` height works with the new aspect ratio (a text logo is wide — may need a larger max-width on mobile).

## 8. Youngsters pricing layout = main layout, youngsters colors

Current state: minimal variant uses a numbered price **list** (`.priceList` / `.priceRow`, `BarbershopPage.module.scss:502-513`); loud variant uses a card **grid** (`.priceGrid` / `.priceCard`).

Steps:
1. In `BarbershopPage.tsx:218-242`, remove the `isLoud` branch for pricing and always render the `.priceList` markup.
2. In SCSS, add `.loud` overrides for the list: border colors from the youngsters palette ($Y_BORDER / $Y_GREEN), `priceNum` in $Y_GREEN, `priceValue` in $Y_YELLOW, hover accent — matching the loud theme already defined at the top of the file.
3. Delete the now-unused `.priceGrid` / `.priceCard` styles.

## 9. Phone number next to address on main location hero

In `BarbershopPage.tsx:144` the hero shows `{data.address}` (`.heroAddress`). Add the phone next to it as a clickable link:

```tsx
<div className={styles.heroAddress}>
  {data.address}
  <span className={styles.heroDot}>·</span>
  <a href={`tel:${data.phone}`}>{data.phone}</a>
</div>
```

Phone comes from `locations.main.phone` in `data.js` (`+380962210799`). Style the link to inherit the address color with a hover state; stack address/phone vertically on narrow screens. Applies to the minimal (main) variant per the request; keeping it for both variants is harmless and recommended for consistency — decide during implementation.

---

## Suggested implementation order

1. Asset swaps that touch only imports: **1, 7** (header logos), **3** (photos), **2** (masters).
2. Template changes: **5, 6** (hero/title logos), **9** (phone in hero).
3. Layout work: **8** (pricing unification), **4** (carousel — biggest chunk, new dependency + component).
4. Cleanup: delete unused old assets and dead styles, run `npm run lint && npm run build`.

## Verification checklist

- `npm run build` passes (case-sensitive image imports resolve).
- All three pages (`/`, `/main`, `/youngsters`) render correct logos, photos, and masters with matching names.
- Carousel: swipe on mobile, arrows on desktop, lightbox still opens, loop works.
- Youngsters pricing visually mirrors main layout but in youngsters colors.
- Phone link on main hero dials on mobile (`tel:`).
- Lighthouse/visual pass on mobile widths (375px) — hero logos and wide text logos don't overflow.
