using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Domain.Entities;
using StudentManagement.Infrastructure.Persistence;

namespace StudentManagement.Infrastructure.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly SqlServerDbContext _sqlContext;

    public DepartmentRepository(
        SqlServerDbContext sqlContext,
        PostgreSqlDbContext postgresContext)
    {
        _sqlContext = sqlContext;
    }

    public async Task<(IEnumerable<Department> Departments, int TotalRecords)> GetAllAsync(PaginationDto pagination)
    {
        var query = _sqlContext.Departments.AsQueryable();

        if (!string.IsNullOrWhiteSpace(pagination.Search))
        {
            query = query.Where(d =>
                d.Name.Contains(pagination.Search));
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
        return await _sqlContext.Departments.FindAsync(id);
    }

    public async Task AddAsync(Department department)
    {
        await _sqlContext.Departments.AddAsync(department);
    }

    public async Task UpdateAsync(Department department)
    {
        var sqlDepartment = await _sqlContext.Departments
            .FirstOrDefaultAsync(d => d.Id == department.Id);

        if (sqlDepartment != null)
        {
            sqlDepartment.Name = department.Name;
        }

        await _sqlContext.SaveChangesAsync();
    }

    public void Delete(Department department)
    {
        var sqlDepartment = _sqlContext.Departments.Find(department.Id);
        if (sqlDepartment != null)
        {
            _sqlContext.Departments.Remove(sqlDepartment);
        }
    }

    public async Task SaveChangesAsync()
    {
        await _sqlContext.SaveChangesAsync();
    }
}
