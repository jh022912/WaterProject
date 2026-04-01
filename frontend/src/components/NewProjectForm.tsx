import { useState } from 'react';
import type { Project } from '../types/project';
import { addProject } from '../api/projects.api';

interface NewProjectFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewProjectForm = ({ onSuccess, onCancel }: NewProjectFormProps) => {
    const [formData, setFormData] = useState<Project>({
        projectId: 0,
        projectName: '',
        projectType: '',
        projectRegionalProgram: '',
        projectImpact: 0,
        projectPhase: '',
        projectFunctionalityStatus: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addProject(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a New Project</h2>

            <label>
                Project Name
                <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                />
            </label>

            <label>
                Project Type
                <input
                    type="text"
                    name="projectType"
                    value={formData.projectType ?? ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Regional Program
                <input
                    type="text"
                    name="projectRegionalProgram"
                    value={formData.projectRegionalProgram ?? ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Impact
                <input
                    type="number"
                    name="projectImpact"
                    value={formData.projectImpact ?? 0}
                    onChange={handleChange}
                />
            </label>

            <label>
                Phase
                <input
                    type="text"
                    name="projectPhase"
                    value={formData.projectPhase ?? ''}
                    onChange={handleChange}
                />
            </label>

            <label>
                Functionality Status
                <input
                    type="text"
                    name="projectFunctionalityStatus"
                    value={formData.projectFunctionalityStatus ?? ''}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">Add Project</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default NewProjectForm;
