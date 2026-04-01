import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';
import AdminProjectsPage from './pages/AdminProjectsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProjectList />} />
                <Route path="/admin-projects" element={<AdminProjectsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
