import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Layout from "./Layout";
import SignUp from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
