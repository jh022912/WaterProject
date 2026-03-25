using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WaterController : ControllerBase
{
    // Inject the database context so we can query the database
    private WaterDbContext _waterContext;

    public WaterController(WaterDbContext temp) => _waterContext = temp;

    // GET /api/water/get-all-projects?pageSize=10&pageNum=1
    // pageSize and pageNum come in as query parameters from the React fetch request.
    // Default values are used if nothing is passed in.
    [HttpGet("get-all-projects")]
    public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
    {
        // Start with an IQueryable — this builds the query without running it yet.
        // Unlike ToList(), IQueryable lets us add conditions piece by piece before hitting the database.
        var query = _waterContext.Projects.AsQueryable();

        // Only apply the filter if at least one project type was passed in.
        if (projectTypes != null && projectTypes.Any())
        {
            query = query.Where(p => projectTypes.Contains(p.ProjectType));
        }

        // Count AFTER filtering so pagination is calculated against the filtered set.
        var totalNumProjects = query.Count();

        var projects = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var someObject = new
        {
            projects = projects,
            totalNumProjects = totalNumProjects
        };

        return Ok(someObject);
    }

    // GET /api/water/get-project-types
    // Returns a distinct list of project types for the category filter checkboxes
    [HttpGet("get-project-types")]
    public IActionResult GetProjectTypes()
    {
        var projectTypes = _waterContext.Projects
            .Select(p => p.ProjectType)
            .Distinct()
            .ToList();

        return Ok(projectTypes);
    }
}
