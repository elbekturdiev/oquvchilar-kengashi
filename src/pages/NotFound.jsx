import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../components/UI.jsx'

export default function NotFound() {
  const { t } = useLang()
  usePageTitle(t('notFound'))
  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <p className="font-brand text-7xl font-extrabold text-lilac sm:text-8xl">404</p>
      <h1 className="mt-4 font-lato text-2xl font-bold">{t('notFound')}</h1>
      <Link to="/" className="btn-primary mt-6">
        {t('toHome')}
      </Link>
    </div>
  )
}
