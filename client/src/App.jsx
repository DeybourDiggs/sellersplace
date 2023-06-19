import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedPage from "./components/ProtectedPage";
import Loader from "./components/Loader";
import Profile from "./pages/Profile";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
