import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BLOG } from 'blog.config';
import clsx from 'clsx';
import Image from 'next/image';
const NavBar = () => {
  const links = [
    { id: 0, name: 'Posts', to: BLOG.path || '/posts', show: true },
    { id: 1, name: 'About', to: '/about', show: BLOG.showAbout },
    { id: 2, name: 'Feed', to: '/feed', show: true },
    { id: 3, name: 'Search', to: '/search', show: true },
  ];

  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav">
                <Link href={link.to}>{link.name}</Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

type HeaderProps = {
  navBarTitle: string | null;
  fullWidth?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ navBarTitle, fullWidth }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const sentinalRef = useRef<HTMLDivElement>(null);
  const handler = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (navRef && navRef.current && !BLOG.autoCollapsedNavBar) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full');
      } else {
        navRef.current.classList.remove('sticky-nav-full');
      }
    } else {
      navRef?.current?.classList.add('remove-sticky');
    }
  }, []);
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    if (sentinalRef?.current) obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current);
    // };
  }, [sentinalRef, handler]);
  return (
    <>
      <div className="h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={clsx(
          'sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60',
          {
            'px-4 md:px-24': fullWidth,
            'max-w-2xl px-4': !fullWidth,
          }
        )}
        id="sticky-nav"
        ref={navRef}>
        <div className="flex items-center">
          <Link href="/" aria-label={BLOG.title}>
            <div className="min-w-max">
              <Image src="/pw.png" alt="pw" width={16} height={16} />
            </div>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title} -
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};
