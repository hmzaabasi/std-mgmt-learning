using StudentManagement.Application.DTOs.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Departments.Queries.GetAllDepartments
{
    public class GetAllDepartmentsQuery
    {
        public PaginationDto Pagination { get; set; }
    }
}
