using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.DTOs.Department;
using StudentManagement.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Departments.Queries.GetAllDepartments
{
    public class GetAllDepartmentsQueryHandler
    {
        private readonly IDepartmentReadRepository _departmentReadRepository;

        public GetAllDepartmentsQueryHandler(IDepartmentReadRepository departmentReadRepository)
        {
            _departmentReadRepository = departmentReadRepository;
        }

        public async Task<PagedResult<DepartmentDto>> Handle(GetAllDepartmentsQuery query)
        {
            var result = await _departmentReadRepository.GetAllAsync(query.Pagination);

            var departmentDtos = result.Departments.Select(department => new DepartmentDto
            {
                Id = department.Id,
                Name = department.Name
            });

            return new PagedResult<DepartmentDto>
            {
                Items = departmentDtos,
                Page = query.Pagination.Page,
                PageSize = query.Pagination.PageSize,
                TotalRecords = result.TotalRecords
            };
        }
    }
}
