import { Dosis } from "next/font/google";
import Image from "next/image";

import "./globals.css";
import { ThemeProvider } from "./_components/theme/theme-provider";
import { ThemeToggler } from "./_components/theme/theme-toggler";

const dosis = Dosis({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "My custom chatgpt",
  description: "Chat with llama 3 meta model",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dosis.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="flex flex-row m-2">
            <div className="flex flex-none items-center justify-center h-[40px] w-[40px] rounded-lg">
              <Image
                src="/img/logo.svg"
                alt="logo"
                width={40}
                height={40}
                priority={false}
                className="dark:invert"
              />
            </div>
            <div className="ml-auto">
              <ThemeToggler />
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
