import { Providers } from "@/contexts/root";
import LogoWhite from "@/public/logo-white.svg";
import Icon from "@/public/logo_min.png";
import "./global.css";

export const metadata = {
  title: {
    template: "NuOJ - %s",
    default: "NuOJ",
  },
  openGraph: {
    title: "NuOJ - Index",
    url: "https://nuoj.ntut-xuan.net/",
    image: LogoWhite.src,
  },
  description: "一款來自 國立臺北科技大學 的線上程式評測系統s",
  icons: {
    icon: Icon.src,
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
