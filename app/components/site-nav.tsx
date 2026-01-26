'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const isActivePath = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 text-sm">
      {navLinks.map((link) => {
        const isActive = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              isActive
                ? 'text-slate-900 dark:text-slate-100'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
