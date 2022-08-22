import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DemosProvider } from "../src/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DemosProvider>
      <Component {...pageProps} />
    </DemosProvider>
  );
}

export default MyApp;
