import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data && data.type === "fcmToken") {
          // Send confirmation back to React Native
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "tokenReceived",
                token: data.token,
              })
            );
          } else {
            // Fallback for testing in browser
            console.log("Would send confirmation to React Native:", data.token);
          }
        }
      } catch (error) {
        console.log("Regular message:", event.data);
        console.log("Error parsing message:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
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
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
