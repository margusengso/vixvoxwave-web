const stores = [
  {
    label: 'App Store',
    platform: 'For iPhone and iPad',
  },
  {
    label: 'Google Play',
    platform: 'For Android',
  },
]

export function StoreAvailability({ compact = false }) {
  return (
    <div
      className={`store-list${compact ? ' store-list--compact' : ''}`}
      aria-label="App store availability"
    >
      {stores.map((store) => (
        <div
          className="store-badge"
          key={store.label}
          tabIndex="0"
          aria-disabled="true"
          aria-label={`${store.label}: soon available`}
        >
          <span className="store-badge__icon" aria-hidden="true">
            {store.label === 'App Store' ? 'A' : '▶'}
          </span>
          <span className="store-badge__copy">
            <span>{store.platform}</span>
            <strong>{store.label}</strong>
            <em>Soon available</em>
          </span>
          <span className="store-tooltip" role="tooltip">
            Soon available
          </span>
        </div>
      ))}
    </div>
  )
}
