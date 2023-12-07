import Dashboard from "./Components/Dashboard";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState({
    id: "",
    username: "",
    email: "",
    role: "",
  });

  // console.log(userId, "userId");
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route
            index
            element={<Users setUserId={(val) => setUserId(val)} />}
          />
          <Route
            path="add-user"
            element={<AddUser {...userId} setUserId={setUserId} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
