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
    public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
    {
        var query = _waterContext.Projects.AsQueryable();

        if (projectTypes != null && projectTypes.Any())
        {
            query = query.Where(p => projectTypes.Contains(p.ProjectType));
        }

        var totalNumProjects = query.Count();

        var projects = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new { projects, totalNumProjects });
    }

    [HttpGet("get-project-types")]
    public IActionResult GetProjectTypes()
    {
        var types = _waterContext.Projects
            .Select(p => p.ProjectType)
            .Distinct()
            .ToList();

        return Ok(types);
    }

    [HttpPost("Add")]
    public IActionResult AddProject([FromBody] Project newProject)
    {
        _waterContext.Projects.Add(newProject);
        _waterContext.SaveChanges();
        return Ok(newProject);
    }

    [HttpPut("UpdateProject/{projectId}")]
    public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
    {
        var existingProject = _waterContext.Projects.Find(projectId);

        if (existingProject == null)
            return NotFound("Project not found");

        existingProject.ProjectName = updatedProject.ProjectName;
        existingProject.ProjectType = updatedProject.ProjectType;
        existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
        existingProject.ProjectImpact = updatedProject.ProjectImpact;
        existingProject.ProjectPhase = updatedProject.ProjectPhase;
        existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

        _waterContext.Projects.Update(existingProject);
        _waterContext.SaveChanges();
        return Ok(existingProject);
    }

    [HttpDelete("DeleteProject/{projectId}")]
    public IActionResult DeleteProject(int projectId)
    {
        var project = _waterContext.Projects.Find(projectId);

        if (project == null)
            return NotFound("Project not found");

        _waterContext.Projects.Remove(project);
        _waterContext.SaveChanges();
        return NoContent();
    }
}
