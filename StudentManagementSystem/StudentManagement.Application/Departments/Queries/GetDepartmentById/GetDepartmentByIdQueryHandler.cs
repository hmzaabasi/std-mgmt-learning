using StudentManagement.Application.DTOs.Department;
using StudentManagement.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Departments.Queries.GetDepartmentById
{
    public class GetDepartmentByIdQueryHandler
    {
        private readonly IDepartmentReadRepository _departmentReadRepository;

        public GetDepartmentByIdQueryHandler(IDepartmentReadRepository departmentReadRepository)
        {
            _departmentReadRepository = departmentReadRepository;
        }

        public async Task<DepartmentDto?> Handle(GetDepartmentByIdQuery query)
        {
            var department = await _departmentReadRepository.GetByIdAsync(query.Id);

            if (department == null)
                return null;

            return new DepartmentDto
            {
                Id = department.Id,
                Name = department.Name
            };
        }
    }
}
