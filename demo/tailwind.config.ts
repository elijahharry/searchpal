import type { Config } from "tailwindcss";
import {
  isolateInsideOfContainer,
  scopedPreflightStyles,
} from "tailwindcss-scoped-preflight";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".preflight", {
        except: ".no-preflight",
      }),
    }),
  ],
};

export default config;
