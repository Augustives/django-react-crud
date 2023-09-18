import RootLayout from "./components/layouts/root_layout";
import { AuthProvider } from "./context/auth_provider";

const App = () => {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
};

export default App;
