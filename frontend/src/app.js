import RootLayout from "./components/layouts/root_layout";
import { UserProvider } from "./context/user_provider";

const App = () => {
  return (
    <UserProvider>
      <RootLayout />
    </UserProvider>
  );
};

export default App;
