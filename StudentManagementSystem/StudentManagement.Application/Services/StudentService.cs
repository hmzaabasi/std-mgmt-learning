using System;
using System.Collections.Generic;
using System.Text;
using StudentManagement.Application.DTOs.Student;
using StudentManagement.Application.DTOs.Common;    
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Application.Interfaces.Services;
using StudentManagement.Domain.Entities;
using StudentManagement.Application.Common;
using StudentManagement.Application.Students.Events;


namespace StudentManagement.Application.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IEventQueue _eventQueue;
    private readonly IStudentReadRepository _studentReadRepository;

    public StudentService(
        IStudentRepository studentRepository,
        IDepartmentRepository departmentRepository,
        IEventQueue eventQueue,
        IStudentReadRepository studentReadRepository)
    {
        _studentRepository = studentRepository;
        _departmentRepository = departmentRepository;
        _eventQueue = eventQueue;
        _studentReadRepository = studentReadRepository;
    }

    public async Task<PagedResult<StudentDto>> GetAllAsync(PaginationDto pagination)
    {
        var result = await _studentReadRepository.GetAllAsync(pagination);

        var studentDtos = result.Students.Select(student => new StudentDto
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email,
            Age = student.Age,
            DepartmentId = student.DepartmentId,
            DepartmentName = student.Department?.Name ?? string.Empty
        });

        return new PagedResult<StudentDto>
        {
            Items = studentDtos,
            Page = pagination.Page,
            PageSize = pagination.PageSize,
            TotalRecords = result.TotalRecords
        };
    }

    public async Task<StudentDto?> GetByIdAsync(int id)
    {
        var student = await _studentReadRepository.GetByIdAsync(id);

        if (student == null)
            return null;

        return new StudentDto
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email,
            Age = student.Age,
            DepartmentId = student.DepartmentId,
            DepartmentName = student.Department?.Name ?? string.Empty
        };
    }

    public async Task<StudentDto?> CreateAsync(CreateStudentDto dto)
    {
        var department = await _departmentRepository.GetByIdAsync(dto.DepartmentId);

        if (department == null)
            return null;

        var student = new Student
        {
            Name = dto.Name,
            Email = dto.Email,
            Age = dto.Age,
            DepartmentId = dto.DepartmentId
        };

        await _studentRepository.AddAsync(student);
        await _studentRepository.SaveChangesAsync();

        _eventQueue.Enqueue(new StudentCreatedEvent
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email,
            Age = student.Age,
            DepartmentId = student.DepartmentId
        });

        return new StudentDto
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email,
            Age = student.Age,
            DepartmentId = student.DepartmentId,
            DepartmentName = department.Name
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateStudentDto dto)
    {
        if (id != dto.Id)
            return false;

        var student = await _studentRepository.GetByIdAsync(id);

        if (student == null)
            return false;

        var department = await _departmentRepository.GetByIdAsync(dto.DepartmentId);

        if (department == null)
            return false;

        student.Name = dto.Name;
        student.Email = dto.Email;
        student.Age = dto.Age;
        student.DepartmentId = dto.DepartmentId;

        await _studentRepository.UpdateAsync(student);

        _eventQueue.Enqueue(new StudentUpdatedEvent
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email,
            Age = student.Age,
            DepartmentId = student.DepartmentId
        });

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var student = await _studentRepository.GetByIdAsync(id);

        if (student == null)
            return false;

        _studentRepository.Delete(student);

        await _studentRepository.SaveChangesAsync();

        _eventQueue.Enqueue(new StudentDeletedEvent
        {
            Id = id
        });

        return true;
    }
}
