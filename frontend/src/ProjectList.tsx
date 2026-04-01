import { useState, useEffect } from 'react';
import type { Project } from './types/project';
import { fetchProjects } from './api/projects.api';
import Pagination from './components/Pagination';

function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState<number>(9);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [selectedCategories] = useState<string[]>([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const data = await fetchProjects(pageSize, pageNum, selectedCategories);
                setProjects(data.projects);
                setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <>
            <h1>Water Projects</h1>
            <br />
            {projects.map((p) => (
                <div id="project-card" key={p.projectId}>
                    <h3>{p.projectName}</h3>
                    <ul>
                        <li>Project Type: {p.projectType}</li>
                        <li>Regional Program: {p.projectRegionalProgram}</li>
                        <li>Impact: {p.projectImpact} individuals served</li>
                        <li>Phase: {p.projectPhase}</li>
                        <li>Status: {p.projectFunctionalityStatus}</li>
                    </ul>
                </div>
            ))}

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </>
    );
}

export default ProjectList;
