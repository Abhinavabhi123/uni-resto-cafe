import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
const LandingPage = lazy(() => import("./Pages/LandingPage"));
import Loading from "./Components/Loaders/Loading"
import SplashScreen from "./Pages/SplashScreen";

export default function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
