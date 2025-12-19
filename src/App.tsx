import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Demos from "./pages/Demos";
import BudgetDemo from "./pages/demos/BudgetDemo";
import AsyncSearchDemo from "./pages/demos/AsyncSearchDemo";
import PaymentStatusDemo from "./pages/demos/PaymentStatus";
import Engineering from "./pages/Engineering";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />

        <Route path="/demos" element={<Demos />} />
        <Route path="/demos/budget" element={<BudgetDemo />} />
        <Route path="/demos/async-search" element={<AsyncSearchDemo />} />
        <Route path="/demos/payment-status" element={<PaymentStatusDemo />} />

        <Route path="/engineering" element={<Engineering />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
