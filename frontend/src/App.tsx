import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProjectsPage from './pages/ProjectsPage';
import DonatePage from './pages/DonatePage';
import CartPage from './pages/CartPage';

function App() {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ProjectsPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/donate/:projectName/:projectId" element={<DonatePage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
