'use client';
import { useEffect, useState } from 'react';
import { navLinks } from '@/app/lib/placeholder-data';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';

interface NavItemsProps {
  setIsOpen: (isOpen: boolean) => void;
}

const NavItems = ({ setIsOpen }: NavItemsProps) => {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const labels: Record<string, string> = {
    About: t('about'),
    'Selected Work': t('work'),
    Services: t('services'),
    Articles: t('articles'),
  };

  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, name, href }) => {
        const isActive =
          pathname === href || (href === '/' && pathname === '/');

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
          <button
            onClick={() => setIsOpen((open) => !open)}
            className="order-1 text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle Menu"
          >
            <Image
              src={isOpen ? '/close.svg' : '/menu.svg'}
              alt="Toggle"
              width={20}
              height={20}
            />
          </button>

          <div className="order-2 flex items-center gap-3 sm:contents">
            <Link
              href="/"
              className="text-white opacity-85 hover:opacity-100 transition-[opacity,color] font-bold text-lg hover:text-white flex items-center sm:order-1"
            >
              <Image
                src="/logo.png"
                alt="Wseem Kharma logo"
                width={50}
                height={50}
              />
            </Link>
            <button
              type="button"
              onClick={() =>
                router.replace(pathname, {
                  locale: locale === 'ar' ? 'en' : 'ar',
                })
              }
              className="rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-gray-300 transition hover:border-teal-ground hover:text-white sm:order-3"
              aria-label={`Switch language to ${t('switchTo')}`}
            >
              {t('switchTo')}
            </button>
          </div>
          <nav className="order-3 hidden bg-black-backtwo sm:order-2 sm:flex">
            <NavItems setIsOpen={setIsOpen} />
          </nav>
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
