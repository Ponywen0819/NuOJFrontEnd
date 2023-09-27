import { List } from "./list";
import { NavLink } from "./link";

export const Nav = () => {
  return (
    <List>
      <NavLink href="/problem/list" label="題目" />
      <NavLink href="/about" label="關於" />
    </List>
  );
};
