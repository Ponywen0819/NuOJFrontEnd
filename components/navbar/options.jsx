import { MenuItem } from "@/components/chakra";
import { MenuLink } from "./link";

export const pages = [
  { title: "題目", href: "/problem/list" },
  { title: "關於", href: "/about" },
];

export const AuthOptions = () => {
  return (
    <>
      <MenuItem as={MenuLink} href="/auth/login">
        登入
      </MenuItem>
      <MenuItem as={MenuLink} href="/auth/registe">
        註冊
      </MenuItem>
    </>
  );
};

export const PageOptions = () => {
  return pages.map(({ title, href }) => (
    <MenuItem key={href} as={MenuLink} href={href}>
      {title}
    </MenuItem>
  ));
};
