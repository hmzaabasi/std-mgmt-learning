using Microsoft.EntityFrameworkCore;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Domain.Entities;
using StudentManagement.Infrastructure.Persistence;

namespace StudentManagement.Infrastructure.Repositories
{
    public class DepartmentReadRepository : IDepartmentReadRepository
    {
        private readonly PostgreSqlDbContext _postgresContext;

        public DepartmentReadRepository(PostgreSqlDbContext postgresContext)
        {
            _postgresContext = postgresContext;
        }

        public async Task<(IEnumerable<Department> Departments, int TotalRecords)> GetAllAsync(PaginationDto pagination)
        {
            var query = _postgresContext.Departments.AsQueryable();

            if (!string.IsNullOrWhiteSpace(pagination.Search))
            {
                query = query.Where(d => d.Name.Contains(pagination.Search));
            }

            query = pagination.SortBy?.ToLower() switch
            {
                "name" => pagination.SortOrder.ToLower() == "desc"
                    ? query.OrderByDescending(d => d.Name)
                    : query.OrderBy(d => d.Name),

                _ => pagination.SortOrder.ToLower() == "desc"
                    ? query.OrderByDescending(d => d.Id)
                    : query.OrderBy(d => d.Id)
            };

            var totalRecords = await query.CountAsync();

            var departments = await query
                .Skip((pagination.Page - 1) * pagination.PageSize)
                .Take(pagination.PageSize)
                .ToListAsync();

            return (departments, totalRecords);
        }

        public async Task<Department?> GetByIdAsync(int id)
        {
            return await _postgresContext.Departments.FindAsync(id);
        }
    }
}