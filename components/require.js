import { auth_context } from "@/contexts/auth";
import { navigate_context } from "@/contexts/navigate";
import second from "first";

export const RequireAuth = ({ children, loadingElement = <p>rr</p> }) => {
  const { user } = useContext(auth_context);
  const navigate = useContext(navigate_context);
  const location = usePathname();
  const router = useRouter();

  console.log(location);

  if (user) {
    if (user.isLogin) return children;
    else return loadingElement;
  } else {
    navigate.record(location);
    router.replace("/auth/login");
  }
};
