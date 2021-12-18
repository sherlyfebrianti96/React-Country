import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CountriesPage from "./pages/Countries";
import Dashboard from "./pages/Dashboard";

export const App: React.FunctionComponent = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/language">Languages</Route>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
