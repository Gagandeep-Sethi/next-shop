import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./(components)/Header";
import ReduxProvider from "@/provider/redux/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopping App",
  description: "Generated by Sky",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
