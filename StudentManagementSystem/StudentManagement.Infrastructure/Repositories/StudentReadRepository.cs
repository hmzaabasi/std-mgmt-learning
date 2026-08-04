using Microsoft.EntityFrameworkCore;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Domain.Entities;
using StudentManagement.Infrastructure.Persistence;

namespace StudentManagement.Infrastructure.Repositories
{
    public class StudentReadRepository : IStudentReadRepository
    {
        private readonly PostgreSqlDbContext _postgresContext;

        public StudentReadRepository(PostgreSqlDbContext postgresContext)
        {
            _postgresContext = postgresContext;
        }

        public async Task<(IEnumerable<Student> Students, int TotalRecords)> GetAllAsync(PaginationDto pagination)
        {
            var query = _postgresContext.Students
                .Include(s => s.Department)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Search))
            {
                var search = pagination.Search.Trim().ToLower();

                query = query.Where(s =>
                    s.Name.ToLower().Contains(search) ||
                    s.Email.ToLower().Contains(search) ||
                    s.Department!.Name.ToLower().Contains(search));
            }

            query = (pagination.SortBy.ToLower(), pagination.SortOrder.ToLower()) switch
            {
                ("name", "desc") => query.OrderByDescending(s => s.Name),
                ("name", _) => query.OrderBy(s => s.Name),

                ("email", "desc") => query.OrderByDescending(s => s.Email),
                ("email", _) => query.OrderBy(s => s.Email),

                ("age", "desc") => query.OrderByDescending(s => s.Age),
                ("age", _) => query.OrderBy(s => s.Age),

                ("department", "desc") => query.OrderByDescending(s => s.Department!.Name),
                ("department", _) => query.OrderBy(s => s.Department!.Name),

                ("id", "desc") => query.OrderByDescending(s => s.Id),
                _ => query.OrderBy(s => s.Id)
            };

            var totalRecords = await query.CountAsync();

            var students = await query
                .Skip((pagination.Page - 1) * pagination.PageSize)
                .Take(pagination.PageSize)
                .ToListAsync();

            return (students, totalRecords);
        }

        public async Task<Student?> GetByIdAsync(int id)
        {
            return await _postgresContext.Students
                .Include(s => s.Department)
                .FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}