import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ProjectList from './ProjectList';
import WelcomeBand from './WelcomeBand';

function App() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container">
            <div className="row bg-primary text-white">
                <WelcomeBand />
            </div>
            <div className="row mt-4">
                <div className="col-md-3">
                    <CategoryFilter onCheckboxChange={setSelectedCategories} />
                </div>
                <div className="col-md-9">
                    <ProjectList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    );
}

export default App;
