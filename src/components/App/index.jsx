import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./../LoginPage/";
import RegisterPage from "./../RegisterPage/";
import RecordsPage from "./../RecordsPage/";
import NewEntryPage from "./../NewEntryPage";

import UserContext from "../../contexts/UserContext";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/records/add" elemtn={<NewEntryPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
