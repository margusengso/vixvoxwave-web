export function ComicPicture({
  describedBy,
  eager = false,
  image,
  shortAlt,
  sizes = '(max-width: 760px) 100vw, 720px',
}) {
  const srcSet = image.responsive
    .map((source) => `${source.path} ${source.width}w`)
    .join(', ')

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        alt={shortAlt}
        aria-describedby={describedBy}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        src={image.fallbackPath}
        width={image.width}
      />
    </picture>
  )
}
