import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./(components)/Header";
import ReduxProvider from "@/provider/redux/ReduxProvider";
import { NextAuthProvider } from "@/provider/google/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopping App",
  description: "Generated by Sky",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <NextAuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            {children}
          </body>
        </html>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </NextAuthProvider>
    </ReduxProvider>
  );
}
