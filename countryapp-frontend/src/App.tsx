import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CountryList } from "./components/CountryList";
import { CountryDetail } from "./components/CountryDetail";
import { Globe2 } from "lucide-react";

function App() {
  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe2 className="h-8 w-8" />
            <h1 className="text-xl font-bold">World Explorer</h1>
          </div>
        </div>
      </header>
      <main>
        <Router>
          <div className="container mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={<CountryList />} />
              <Route path="/country/:countryCode" element={<CountryDetail />} />
            </Routes>
          </div>
        </Router>
      </main>
    </>
  );
}

export default App;
