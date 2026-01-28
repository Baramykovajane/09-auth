
import NotFoundRedirect from "./NotFoundRedirect"
import css from '@/styles/NotFound.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found',
  description:
    'Sorry, the page you are looking for does not exist. You will be redirected to the homepage',
  metadataBase: new URL('https://notehub.app'),
  openGraph: {
    title: '404 – Page Not Found',
    description:
      'Sorry, the page you are looking for does not exist. You will be redirected to the homepage',
    url: 'https://notehub.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 – Page Not Found',
      },
    ],
  },
};


export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <NotFoundRedirect />
    </div>
  );
}
