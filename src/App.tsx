import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Popular from "./routes/Popular";
import ComingSoon from "./routes/ComingSoon";
import NowPlaying from "./routes/NowPlaying";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/movie/:id" element={<Popular />} />
        <Route path="now" element={<NowPlaying />} />
        <Route path="now/movie/:id" element={<NowPlaying />} />
        <Route path="soon" element={<ComingSoon />} />
        <Route path="soon/movie/:id" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}
