import useUser from "@/libs/client/useUser";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import useSWR, { SWRConfig } from "swr";

export const globalFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
  // console.log("app");
  const { user, isLoading } = useUser();

  return (
    <SWRConfig value={{ fetcher: globalFetcher }}>
      <Component {...pageProps} user={{ user, isLoading }} />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          // console.log("script is loaded");
        }}
      />
    </SWRConfig>
  );
}
