import { ColorProvider } from "@/contexts/color";
import { OauthProvider } from "@/contexts/oauth";

const AuthLayout = ({ children }) => {
  return (
    <main className="min-h-screen">
      <OauthProvider>
        <ColorProvider>{children}</ColorProvider>
      </OauthProvider>
    </main>
  );
};

export default AuthLayout;
