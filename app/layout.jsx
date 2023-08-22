import { Providers } from "@/contexts/root";
import { Box } from "@/components/chakra";
import LogoWhite from "@/public/logo-white.svg";
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
	return (
		<Box as="html" lang="en">
			<Box as="body" backgroundColor={"rgb(241 245 249)"} minH={"100vh"}>
				<Providers>{children}</Providers>
			</Box>
		</Box>
	);
}
