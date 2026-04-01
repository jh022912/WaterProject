import { useState, useEffect } from 'react';
import './CategoryFilter.css';

function CategoryFilter({ onCheckboxChange }: { onCheckboxChange: (categories: string[]) => void }) {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/water/get-project-types');
                const data = await response.json();
                console.log('Fetched categories:', data);
                setCategories(data);
            } catch (error) {
                console.error('There was an error fetching the categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCheckboxChange = ({ target }: { target: HTMLInputElement }) => {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter((x) => x !== target.value)
            : [...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
        onCheckboxChange(updatedCategories);
    };

    return (
        <div className="category-filter">
            <h5>Project Types</h5>
            <div className="category-list">
                {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input
                            type="checkbox"
                            id={c}
                            value={c}
                            className="category-checkbox"
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;
