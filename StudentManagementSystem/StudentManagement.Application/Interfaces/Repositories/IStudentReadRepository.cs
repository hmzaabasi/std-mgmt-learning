using System;
using System.Collections.Generic;
using System.Text;
using StudentManagement.Domain.Entities;
using StudentManagement.Application.DTOs.Common;

namespace StudentManagement.Application.Interfaces.Repositories
{
    public interface IStudentReadRepository
    {
        Task<(IEnumerable<Student> Students, int TotalRecords)> GetAllAsync(PaginationDto pagination);

        Task<Student?> GetByIdAsync(int id);
    }
}
