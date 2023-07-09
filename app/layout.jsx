import { AuthProvider } from "@/contexts/auth";
import { Navbar } from "@/components/Navbar";
import "./global.css";

export const metadata = {
  title: {
    template: "Nuoj - %s",
    default: "Nuoj",
  },
  openGraph: {
    title: "NuOJ - Index",
    url: "https://nuoj.ntut-xuan.net/",
    image: "/logo-white.svg",
  },
  icons: {
    icon: "/logo_min.png",
  },
  description: "一款來自 國立臺北科技大學 的線上程式評測系統s",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full bg-gray-100 bg-opacity-80 min-h-screen">
        <AuthProvider>
          <Navbar
            links={[
              { title: "題目", href: "/problem" },
              { title: "關於", href: "/about" },
              { title: "狀態", href: "/status" },
            ]}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
