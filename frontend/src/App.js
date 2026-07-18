import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          style: {
            background: "#0A192F",
            color: "#FAF9F6",
            border: "1px solid #C5A059",
            fontFamily: "IBM Plex Sans, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;