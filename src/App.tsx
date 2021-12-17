import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/countries">Countries</Route>
        <Route path="/language">Languages</Route>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
