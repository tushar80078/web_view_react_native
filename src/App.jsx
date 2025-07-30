import { Toaster } from "react-hot-toast";
import "./App.css";

import { HashRouter } from "react-router-dom";
import Root from "@/navigation";
import { useEffect, useState } from "react";

function App() {
  const [fcmToken, setFcmToken] = useState(null);
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;

        if (data && data.type === "fcmToken") {
          // Send confirmation back to React Native
          if (window.ReactNativeWebView) {
            localStorage.setItem("fcmToken", data.token);
            setFcmToken(data.token);

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

  if (!fcmToken) {
    return (
      <div>
        <h1 className="text-center text-2xl font-bold">
          Waiting for FCM Token...
        </h1>
        <p className="text-center mt-4">
          Please ensure your React Native app is running and has sent the token.
        </p>
      </div>
    );
  }

  return (
    <HashRouter>
      <Toaster position="top-right" />
      <Root />
    </HashRouter>
  );
}

export default App;
