import 'react-notion-x/src/styles.css';
import 'styles/globals.css';
import 'styles/notion.css';
import 'styles/prism.css';
import type { AppRouter } from 'server/router';
import superjson from 'superjson';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';

import { AppProps } from 'next/app';

import React from 'react';
import { Session } from 'next-auth';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    // optional: use SSG-caching for each rendered page (see caching section for more details)
    const TWENTY4HRS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${TWENTY4HRS}`
    );

    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      headers: {
        // optional - inform server that it's an ssr request
        'x-ssr': '1',
      },
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);

/* function MyApp({
  Component,
  pageProps,

}: AppProps<{
  initialSession: Session; onRender: ProfilerOnRenderCallback
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}>
      <Profiler id="App" onRender={pageProps.onRender}>
        <Component {...pageProps} />
      </Profiler>
    </SessionContextProvider>
  );
}
 */
