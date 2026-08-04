using Microsoft.AspNetCore.Mvc;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.DTOs.Department;
using StudentManagement.Application.Interfaces.Services;

namespace StudentManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly IDepartmentService _departmentService;

    public DepartmentController(IDepartmentService departmentService)
    {
        _departmentService = departmentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery]PaginationDto pagination)
    {
        var departments = await _departmentService.GetAllAsync(pagination);
        return Ok(departments);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var department = await _departmentService.GetByIdAsync(id);

        if (department == null)
            return NotFound();

        return Ok(department);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateDepartmentDto dto)
    {
        var department = await _departmentService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById),
            new { id = department.Id },
            department);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody]UpdateDepartmentDto dto)
    {
       
        var updated = await _departmentService.UpdateAsync(id, dto);

        if (!updated)
            return BadRequest();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _departmentService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}