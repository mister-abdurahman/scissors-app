import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { NavBar } from './components/NavBar'
import "./App.css";
import { Home } from "./components/Home";
// import { UrlInfo } from "./components/UrlInfo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/info" element={<UrlInfo />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
