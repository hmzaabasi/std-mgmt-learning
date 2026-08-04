using System;
using System.Collections.Generic;
using System.Text;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.DTOs.Student;

namespace StudentManagement.Application.Interfaces.Services;

public interface IStudentService
{
    Task<PagedResult<StudentDto>> GetAllAsync(PaginationDto pagination);

    Task<StudentDto?> GetByIdAsync(int id);

    Task<StudentDto> CreateAsync(CreateStudentDto dto);

    Task<bool> UpdateAsync(int id, UpdateStudentDto dto);

    Task<bool> DeleteAsync(int id);
}