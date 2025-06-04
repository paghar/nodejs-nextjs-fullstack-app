// ─── Styles ───────────────────────────────────────────────────────────────
import "@styles/globals.css";

// ─── Types ────────────────────────────────────────────────────────────────
import type { AppProps } from "next/app";

// ─── Components ───────────────────────────────────────────────────────────
import LayoutWrapper from "@containers/LayoutWrapper";

// ─── Internal Utilities & Context ─────────────────────────────────────────
import { GlobalProvider } from "@context/global/globalContext";

// ─── Component ────────────────────────────────────────────────────────────
export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </GlobalProvider>
  );
}
