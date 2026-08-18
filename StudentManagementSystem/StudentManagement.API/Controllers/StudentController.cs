using Microsoft.AspNetCore.Mvc;
using StudentManagement.Application.DTOs.Student;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.Students.Commands.AddStudent;
using StudentManagement.Application.Students.Commands.UpdateStudent;
using StudentManagement.Application.Students.Commands.DeleteStudent;
using StudentManagement.Application.Students.Queries.GetAllStudents;
using StudentManagement.Application.Students.Queries.GetStudentById;
using Microsoft.AspNetCore.Authorization;

namespace StudentManagement.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class StudentController : ControllerBase
{
    private readonly AddStudentCommandHandler _addStudentHandler;
    private readonly UpdateStudentCommandHandler _updateStudentHandler;
    private readonly DeleteStudentCommandHandler _deleteStudentHandler;
    private readonly GetAllStudentsQueryHandler _getAllStudentsHandler;
    private readonly GetStudentByIdQueryHandler _getStudentByIdHandler;

    public StudentController(
        AddStudentCommandHandler addStudentHandler,
        UpdateStudentCommandHandler updateStudentHandler,
        DeleteStudentCommandHandler deleteStudentHandler,
        GetAllStudentsQueryHandler getAllStudentsHandler,
        GetStudentByIdQueryHandler getStudentByIdHandler)
    {
        _addStudentHandler = addStudentHandler;
        _updateStudentHandler = updateStudentHandler;
        _deleteStudentHandler = deleteStudentHandler;
        _getAllStudentsHandler = getAllStudentsHandler;
        _getStudentByIdHandler = getStudentByIdHandler;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationDto pagination)
    {
        var result = await _getAllStudentsHandler.Handle(new GetAllStudentsQuery { Pagination = pagination });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var student = await _getStudentByIdHandler.Handle(new GetStudentByIdQuery { Id = id });

        if (student == null)
            return NotFound();

        return Ok(student);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateStudentDto dto)
    {
        var command = new AddStudentCommand
        {
            Name = dto.Name,
            Email = dto.Email,
            Age = dto.Age,
            DepartmentId = dto.DepartmentId
        };

        var student = await _addStudentHandler.Handle(command);

        if (student == null)
            return NotFound("Department not found");

        return CreatedAtAction(nameof(GetById), new { id = student.Id }, student);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateStudentDto dto)
    {
        var command = new UpdateStudentCommand
        {
            Id = id,
            Name = dto.Name,
            Email = dto.Email,
            Age = dto.Age,
            DepartmentId = dto.DepartmentId
        };

        var updated = await _updateStudentHandler.Handle(command);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _deleteStudentHandler.Handle(new DeleteStudentCommand { Id = id });

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}