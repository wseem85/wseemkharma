'use client';
import { useEffect, useState } from 'react';
import { navLinks } from '@/app/lib/placeholder-data';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import Image from 'next/image';

interface NavItemsProps {
  setIsOpen: (isOpen: boolean) => void;
}

const NavItems = ({ setIsOpen }: NavItemsProps) => {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const labels: Record<string, string> = {
    Home: t('home'),
    'Selected Work': t('work'),
    Contact: t('contact'),
  };

  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, name, href }) => {
        const isActive = pathname === href || (href === '/' && pathname === '/');

        return (
          <li key={id} className="nav-li">
            <Link
              href={href}
              className={`nav-li_a w-full inline-block ${
                isActive ? 'text-white font-semibold' : ''
              }`}
              onClick={() => setIsOpen(false)}
              aria-current={isActive ? 'page' : undefined}
            >
              {labels[name] ?? name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('navigation');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black-backtwo">
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space ">
          <Link
            href="/"
            className="text-white opacity-85 hover:opacity-100 transition-opacity font-bold text-lg hover:text-white transition-colors flex  items-center"
          >
            <Image src="/logo.png" alt="logo" width={50} height={50} />
          </Link>
          <button
            onClick={() => setIsOpen((open) => !open)}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle Menu"
          >
            <Image
              src={isOpen ? '/close.svg' : '/menu.svg'}
              alt="Toggle"
              // className="w-6 h-6"
              width={20}
              height={20}
            />
          </button>
          <nav className="sm:flex hidden bg-black-backtwo">
            <NavItems setIsOpen={setIsOpen} />
          </nav>
          <button
            type="button"
            onClick={() => router.replace(pathname, {locale: locale === 'ar' ? 'en' : 'ar'})}
            className="ml-4 rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-red-ground hover:text-white"
            aria-label={`Switch language to ${t('switchTo')}`}
          >
            {t('switchTo')}
          </button>
        </div>
      </div>
      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems setIsOpen={setIsOpen} />
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
