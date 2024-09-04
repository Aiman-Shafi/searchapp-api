import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    <>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </>
    </>
  );
}

export default App;
