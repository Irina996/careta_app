import Navbar from "./components/NavBar";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { AuthProvider } from "./contexts";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
