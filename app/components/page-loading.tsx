type PageLoadingProps = {
  locale: string;
};

export default function PageLoading({ locale }: PageLoadingProps) {
  const name = locale === 'ar' ? 'وسيم خرما' : 'Wseem Kharma';

  return (
    <main
      className="page-loading"
      aria-busy="true"
      aria-label={`Loading ${name}`}
    >
      <div
        className="page-loading__brand"
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <span className="page-loading__name">{name}</span>
        <span className="page-loading__indicator" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </div>
      <div className="page-loading__line" aria-hidden="true">
        <span />
      </div>
      <p className="sr-only">Loading page</p>
    </main>
  );
}
