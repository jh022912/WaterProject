import { useState, useEffect } from 'react';
import type { Project } from './types/project';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
    // State variables — React watches these and re-renders the page when they change
    const [projects, setProjects] = useState<Project[]>([]); // the list of projects shown on screen
    const [pageSize, setPageSize] = useState<number>(10);    // how many results per page
    const [pageNum, setPageNum] = useState<number>(1);       // which page we're currently on
    const [totalNumProjects, setTotalNumProjects] = useState<number>(0); // total records in the database
    const [totalPages, setTotalPages] = useState<number>(0); // total number of pages based on size

    // useEffect runs the fetch whenever pageSize, pageNum, or totalNumProjects changes.
    // The dependency array [...] at the bottom controls when this re-runs.
    useEffect(() => {
        const fetchProjects = async () => {
            // Build a query string segment for each selected category.
            // encodeURIComponent handles spaces and special chars safely (e.g. "Borehole Well" → "Borehole%20Well").
            // .join('&') connects them: "projectTypes=X&projectTypes=Y"
            const categoryParams = selectedCategories.map(
                (cat) => `projectTypes=${encodeURIComponent(cat)}`
            ).join('&');

            // Conditionally append category params only if at least one is selected.
            const response = await fetch(
                `http://localhost:4000/api/water/get-all-projects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
            );

            // Parse the JSON response — it comes back as { projects: [...], totalNumProjects: 25 }
            const data = await response.json();

            // Note: .NET serializes property names to lowercase in JSON,
            // so "Projects" becomes "projects" and must be referenced that way here.
            setProjects(data.projects);
            setTotalNumProjects(data.totalNumProjects);

            // Math.ceil() rounds up so we never lose the last partial page.
            // e.g. 25 projects / 10 per page = 2.5 → rounds up to 3 pages
            setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
        };

        fetchProjects();
    }, [pageSize, pageNum, totalNumProjects, selectedCategories]);

    return (
        <>
            {/* Loop through each project and render a Bootstrap card for it */}
            {projects.map((p) => (
                <div className="card" key={p.projectId}>
                    <div className="card-body">
                        <h3 className="card-title">{p.projectName}</h3>
                        <ul className="list-unstyled">
                            <li><b>Project Type: </b>{p.projectType}</li>
                            <li><b>Regional Program: </b>{p.projectRegionalProgram}</li>
                            <li><b>Impact: </b>{p.projectImpact} individuals served</li>
                            <li><b>Phase: </b>{p.projectPhase}</li>
                            <li><b>Status: </b>{p.projectFunctionalityStatus}</li>
                        </ul>
                    </div>
                </div>
            ))}

            <br />

            {/* Dropdown to control how many results appear per page.
                When changed, page size updates AND we reset back to page 1
                so we don't end up on a page that no longer exists. */}
            <label>
                How many results do you want per page?
                <select
                    value={pageSize}
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNum(1);
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>

            <br />

            {/* Previous button — disabled on page 1 so you can't go below page 1 */}
            <button
                disabled={pageNum === 1}
                onClick={() => setPageNum(pageNum - 1)}
            >
                Previous
            </button>

            {/* Dynamically generate one numbered button per page.
                [...Array(totalPages)] creates an array of that length,
                then .map() loops over it like a for loop (index starts at 0).
                We add 1 everywhere because pages start at 1, not 0.
                The current page button is disabled so it looks selected. */}
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setPageNum(index + 1)}
                    disabled={pageNum === (index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            {/* Next button — disabled on the last page so you can't go past the end */}
            <button
                disabled={pageNum === totalPages}
                onClick={() => setPageNum(pageNum + 1)}
            >
                Next
            </button>
            <br /><br />
        </>
    );
}

export default ProjectList;
