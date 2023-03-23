import "react-notion-x/src/styles.css";
import "styles/globals.css";
import "styles/notion.css";
import "styles/prism.css";

import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import React from "react";
import { type Session } from "next-auth";
import { api } from "utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
