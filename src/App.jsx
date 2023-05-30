import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/home/home";
import SignUp from "./pages/signup/signup";
import Account from "./pages/account/Account";
import Login from "./pages/signin/Login";
import { useEffect, useState } from "react";
import Start from "./pages/home/components/Start";
import SetPin from "./pages/pin/SetPin";
import Deposit from "./pages/deposit/Deposit";
import Transfer from "./pages/transfer/Transfer";

function App() {
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    setTimeout(() => setLoader(false), 2600);
  }, []);

  return loading ? (
    <Start loading={loader} />
  ) : (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="account" element={<Account />} />
          <Route path="account/setpin" element={<SetPin />} />
          <Route path="account/deposit" element={<Deposit />} />
          <Route path="account/transfer" element={<Transfer />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
