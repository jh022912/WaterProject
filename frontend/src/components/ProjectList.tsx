import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types/project';
import { fetchProjects } from '../api/projects.api';
import Pagination from './Pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState<number>(9);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const navigate = useNavigate();

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
            {projects.map((p) => (
                <div className="card mb-3" key={p.projectId}>
                    <div className="card-body">
                        <h3 className="card-title">{p.projectName}</h3>
                        <ul className="list-unstyled">
                            <li>Project Type: {p.projectType}</li>
                            <li>Regional Program: {p.projectRegionalProgram}</li>
                            <li>Impact: {p.projectImpact} individuals served</li>
                            <li>Phase: {p.projectPhase}</li>
                            <li>Status: {p.projectFunctionalityStatus}</li>
                        </ul>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/donate/${p.projectName}/${p.projectId}`)}
                        >
                            Donate
                        </button>
                    </div>
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
