using System;
using System.Collections.Generic;
using System.Text;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.DTOs.Department;

namespace StudentManagement.Application.Interfaces.Services;

public interface IDepartmentService
{
    Task<PagedResult<DepartmentDto>> GetAllAsync(PaginationDto pagination);

    Task<DepartmentDto?> GetByIdAsync(int id);

    Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto);

    Task<bool> UpdateAsync(int id, UpdateDepartmentDto dto);

    Task<bool> DeleteAsync(int id);
}