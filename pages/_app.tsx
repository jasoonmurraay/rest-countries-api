import type { AppProps } from "next/app";
import "../styles/globalStyles.css";
import { ThemeProvider } from "../context/themeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
