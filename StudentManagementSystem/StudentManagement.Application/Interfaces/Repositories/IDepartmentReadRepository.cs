using StudentManagement.Domain.Entities;
using StudentManagement.Application.DTOs.Common;

namespace StudentManagement.Application.Interfaces.Repositories;

public interface IDepartmentReadRepository
{
    Task<(IEnumerable<Department> Departments, int TotalRecords)> GetAllAsync(PaginationDto pagination);

    Task<Department?> GetByIdAsync(int id);
}