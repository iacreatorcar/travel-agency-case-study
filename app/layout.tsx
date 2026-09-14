import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "../lib/cart-context";
import { verifySessionToken, SITE_SESSION_COOKIE } from "../lib/site-session";
import LogoutButton from "./LogoutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voyara Travel — Sharm El-Sheikh Tours & Excursions (Portfolio Demo)",
  description:
    "Voyara Travel is a portfolio case study demonstrating a travel agency booking platform: desert safaris, boat trips, snorkeling, and day trips to Cairo, Luxor, Petra and Jerusalem.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const authenticated = verifySessionToken(cookieStore.get(SITE_SESSION_COOKIE)?.value);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="clarity-tracking" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yi9zp71fol");`}
        </Script>
        <CartProvider>{children}</CartProvider>
        {authenticated && <LogoutButton />}
      </body>
    </html>
  );
}
