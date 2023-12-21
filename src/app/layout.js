import { Inter } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/Navbar/MainNavbar";
import Footer from "@/components/Footer/Footer";
import NextSessionProvider from "@/components/NextSessionProvider/NextSessionProvider";
import { openGraphImage } from "./shared-metadata";
const inter = Inter({ subsets: ["latin"] });

export const metadata = { ...openGraphImage };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <NextSessionProvider>
          <div className="navbar-div top-0 z-50 fixed pb-2 w-full bg-orange-50 shadow md:py-0 py-2 px-4">
            <MainNavbar></MainNavbar>
          </div>
          <div className="layout-div mt-28">{children}</div>
          <div className="footer-div mt-auto">
            <Footer></Footer>
          </div>
        </NextSessionProvider>
      </body>
    </html>
  );
}
