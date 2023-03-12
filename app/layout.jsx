import "./globals.css";
import Nav from "./auth/Nav";
import {Roboto} from "@next/font/google"
import QueryWrapper from "./auth/QueryWrapper";
import Toasty from "./components/Toasty";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400","700"],
  variable: "--font-roboto",
})

export const metadata = {
  title: "Post-Up",
  description: "Post anything you like.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-36 xl:mx-88 ${roboto.variable} bg-gray-400`}>
        <QueryWrapper>
        <Nav />
        <Toasty/>
        {children}
        </QueryWrapper>
      </body>
    </html>
  );
}
