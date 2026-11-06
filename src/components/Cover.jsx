// Rasm berilmagan kartalar uchun avtomatik chiroyli muqova (kulrang "rasm yo'q" o'rniga).
export default function Cover({ image, tone = ['#3a1b78', '#a18bef'], icon: Icon, alt = '', className = '', iconSize = 'h-16 w-16', children }) {
  if (image) {
    return (
      <div className={`relative overflow-hidden bg-lilac-100 ${className}`}>
        <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
        {children}
      </div>
    )
  }
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${tone[0]} 0%, ${tone[1]} 100%)` }}
      role="img"
      aria-label={alt}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.16]" aria-hidden="true">
        <defs>
          <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div className="absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-white/10" />
      <div className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-white/10" />
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`${iconSize} text-white/90 drop-shadow transition-transform duration-500 group-hover:scale-110`} strokeWidth={1.4} />
        </div>
      )}
      {children}
    </div>
  )
}
