import { useState, useEffect } from 'react'
import Login from "./components/user/Login.jsx"
import Task from "./components/task/Task.jsx"
import { jwtDecode } from "jwt-decode";
import './App.css'

function App() {

  const [token,setToken] = useState(localStorage.getItem("token"))
  const [user,setUser] = useState({})

  useEffect(() => {
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        setUser(decodeToken);
      } catch (err) {
        console.error("Token no válido:", err);
        localStorage.removeItem("token");
        setToken(null);
        setUser({});
      }
    } else {
      setUser({});
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser({});
  };

  if (!token) {
    return <Login onLoginSuccess={(newToken) => setToken(newToken)} />;
  }

  return (
    <>      
      <Task dataUser={user} onLogout={handleLogout} />
    </>
  );
}

export default App;
