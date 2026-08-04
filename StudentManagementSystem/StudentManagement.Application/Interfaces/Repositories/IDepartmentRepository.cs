using System;
using System.Collections.Generic;
using System.Text;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Domain.Entities;

using StudentManagement.Domain.Entities;

namespace StudentManagement.Application.Interfaces.Repositories;

public interface IDepartmentRepository
{
    Task<Department?> GetByIdAsync(int id);

    Task AddAsync(Department department);

    Task UpdateAsync(Department department);

    void Delete(Department department);

    Task SaveChangesAsync();
}