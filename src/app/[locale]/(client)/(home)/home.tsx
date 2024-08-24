import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div
        className="-z[50] fixed bottom-0 left-0 right-0 top-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://bing.biturl.top?resolution=1366&format=image&index=random)',
        }}
      >
        <div className="h-full w-full bg-foreground/70"></div>
      </div>
      <div className="z-10">
        <h1 className="text-center text-5xl font-bold uppercase text-white">
          {t('site.home.title')}
        </h1>
      </div>
    </main>
  )
}
