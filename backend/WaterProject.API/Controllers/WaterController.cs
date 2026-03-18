using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WaterController : ControllerBase
{
    private WaterDbContext _waterContext;

    public WaterController(WaterDbContext temp) => _waterContext = temp;

    [HttpGet("get-all-projects")]
    public IEnumerable<Project> GetProjects()
    {
        var projects = _waterContext.Projects.ToList();
        return projects;
    }

    [HttpGet("get-functional-projects")]
    public IEnumerable<Project> GetFunctionalProjects()
    {
        var projects = _waterContext.Projects.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        return projects;
    }
}
