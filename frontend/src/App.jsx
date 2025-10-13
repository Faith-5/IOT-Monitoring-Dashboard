import { useState } from "react";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLogin={(username) => setUser(username)} />;
  }

  return <Dashboard user={user} />;
}

export default App;
