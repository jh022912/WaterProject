import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/ProjectList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container">
            <CartSummary />
            <WelcomeBand />
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

export default ProjectsPage;
