import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BagProvider } from "./context/bagContext";
import { Home, BagForm, NotFound } from "./pages";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto">
        <BagProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<BagForm />} />
            <Route path="/bag/:id" element={<BagForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BagProvider>
      </div>
    </div>
  );
}

export default App;
