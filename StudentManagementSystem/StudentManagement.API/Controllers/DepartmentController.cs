using Microsoft.AspNetCore.Mvc;
using StudentManagement.Application.Departments.Commands.AddDepartment;
using StudentManagement.Application.Departments.Commands.DeleteDepartment;
using StudentManagement.Application.Departments.Commands.UpdateDepartment;
using StudentManagement.Application.Departments.Queries.GetAllDepartments;
using StudentManagement.Application.Departments.Queries.GetDepartmentById;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.DTOs.Department;

namespace StudentManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly AddDepartmentCommandHandler _addDepartmentHandler;
    private readonly UpdateDepartmentCommandHandler _updateDepartmentHandler;
    private readonly DeleteDepartmentCommandHandler _deleteDepartmentHandler;
    private readonly GetAllDepartmentsQueryHandler _getAllDepartmentsHandler;
    private readonly GetDepartmentByIdQueryHandler _getDepartmentByIdHandler;

    public DepartmentController(
    AddDepartmentCommandHandler addDepartmentHandler,
    UpdateDepartmentCommandHandler updateDepartmentHandler,
    DeleteDepartmentCommandHandler deleteDepartmentHandler,
    GetAllDepartmentsQueryHandler getAllDepartmentsHandler,
    GetDepartmentByIdQueryHandler getDepartmentByIdHandler)
    {
        _addDepartmentHandler = addDepartmentHandler;
        _updateDepartmentHandler = updateDepartmentHandler;
        _deleteDepartmentHandler = deleteDepartmentHandler;
        _getAllDepartmentsHandler = getAllDepartmentsHandler;
        _getDepartmentByIdHandler = getDepartmentByIdHandler;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery]PaginationDto pagination)
    {
        var departments = await _getAllDepartmentsHandler.Handle(new GetAllDepartmentsQuery { Pagination=pagination});
        return Ok(departments);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var department = await _getDepartmentByIdHandler.Handle(new GetDepartmentByIdQuery { Id=id});

        if (department == null)
            return NotFound();

        return Ok(department);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateDepartmentDto dto)
    {
        var command = new AddDepartmentCommand
        {
            Name= dto.Name
        };
        var department = await _addDepartmentHandler.Handle(command);

        return CreatedAtAction(nameof(GetById),
            new { id = department.Id },
            department);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody]UpdateDepartmentDto dto)
    {
        var command = new UpdateDepartmentCommand
        {
            Id= id,
            Name= dto.Name
        };
       
        var updated = await _updateDepartmentHandler.Handle(command);

        if (!updated)
            return BadRequest();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _deleteDepartmentHandler.Handle(new DeleteDepartmentCommand { Id=id});

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}