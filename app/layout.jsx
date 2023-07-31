import { MockProvider } from '@/mocks/provider';
import { Providers } from '@/contexts/root';

import LogoWhite from '@/public/logo-white.svg';

import "./global.css";


export const metadata = {
  title: {
    template: "Nuoj - %s",
    default: "Nuoj",
  },
  openGraph: {
    title: "NuOJ - Index",
    url: "https://nuoj.ntut-xuan.net/",
    image: LogoWhite.src,
  },
  description: "一款來自 國立臺北科技大學 的線上程式評測系統s",
};

export default function RootLayout({ children }) {
  const enable = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

  return (
    <html lang="en">
      <body className="bg-gray-100 bg-opacity-80 min-h-screen">
      {/* <body className="min-h-screen"> */}
        {
          enable? 
            <MockProvider>
              <Providers>
                  {children}
              </Providers>
            </MockProvider>:
            <Providers>{children}</Providers>
        }
      </body>
    </html>
  );
}
