import { Toaster } from "react-hot-toast";
import "./App.css";
import { Button } from "./components/ui/button";
import { HashRouter } from "react-router-dom";
import Root from "@/navigation";

function App() {
  return (
    <HashRouter>
      <Toaster position="top-right" />
      <Root />
    </HashRouter>
  );
}

export default App;
