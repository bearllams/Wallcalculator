import {Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/LoginPage/index.js";
import CalculatorPage from "./pages/CalculatorPage/index.js";

function App() {
    return (
        <Routes>
            <Route index path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
    );
}

export default App;
