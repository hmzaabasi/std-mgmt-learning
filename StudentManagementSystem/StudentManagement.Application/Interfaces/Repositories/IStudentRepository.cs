using System;
using System.Collections.Generic;
using System.Text;
using StudentManagement.Domain.Entities;
using StudentManagement.Application.DTOs.Common;

namespace StudentManagement.Application.Interfaces.Repositories;

public interface IStudentRepository
{
    Task<Student?> GetByIdAsync(int id);

    Task AddAsync(Student student);

    Task UpdateAsync(Student student);

    void Delete(Student student);

    Task SaveChangesAsync();
}
