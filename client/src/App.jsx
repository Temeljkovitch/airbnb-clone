import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Account from "./pages/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/:subpage?" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
