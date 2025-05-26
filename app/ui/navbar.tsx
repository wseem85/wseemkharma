'use client';
import { useEffect, useState } from 'react';
import { navLinks } from '@/app/lib/placeholder-data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemsProps {
  setIsOpen: (isOpen: boolean) => void;
}

const NavItems = ({ setIsOpen }: NavItemsProps) => {
  return (
    <ul className="nav-ul">
      {navLinks.map(({ id, name, href }) => (
        <li key={id} className="nav-li">
          <Link
            href={href}
            className="nav-li_a"
            onClick={() => setIsOpen(false)}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const pathname = usePathname();
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
            Wseem
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
