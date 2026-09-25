import { Manrope } from "next/font/google";

/** Fontul este descărcat la build și servit de pe domeniul propriu (fără cereri către Google la vizită). */
export const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});
