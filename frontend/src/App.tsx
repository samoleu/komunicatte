import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import ClerkBtn from "./components/ClerkBtn";
import "./App.css";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URI;

function App() {
  const [count, setCount] = useState(0);
  const [chats, setChats] = useState([]);
  const { userId } = useAuth();

  const userChats = async () => {
    if (userId) {
      try {
        const response = await axios.get(`${apiUrl}/api/chat/${userId}`);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    }
  };

  useEffect(() => {
    userChats();
  }, [userId]);

  const testEnv = () => {
    console.log("BASE_URI:", import.meta.env.VITE_BASE_URI);
  };

  useEffect(() => {
    testEnv();
  }, []);

  return (
    <>
      <ClerkBtn />
      <div>Your userId is: {userId}</div>
      <div>You currently have {chats.length} chats</div>
      <div className="flex justify-center items-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;