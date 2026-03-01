export function StagingBanner() {
  if (process.env.STAGING !== 'true') return null

  return (
    <div
      role="banner"
      aria-label="Staging environment notice"
      className="sticky top-0 z-50 bg-yellow-400 text-yellow-900 text-center py-2 px-4 font-semibold text-sm"
    >
      ⚠ STAGING / REVIEW SITE — This is not the live website. Content may be incomplete.
    </div>
  )
}
