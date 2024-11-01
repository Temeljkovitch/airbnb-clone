import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Layout from "./pages/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account/:subpage?" element={<Account />} />
        <Route path="/account/:subpage/:action" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
