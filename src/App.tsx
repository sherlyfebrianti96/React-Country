import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CountriesPage from "./pages/Countries";
import Dashboard from "./pages/Dashboard";
import LanguagesPage from "./pages/Languages";

export const App: React.FunctionComponent = () => {
  const queryClient = new QueryClient();
  const theme = createTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/languages" element={<LanguagesPage />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
