using System;
using System.Collections.Generic;
using System.Text;

using StudentManagement.Application.DTOs.Common;

namespace StudentManagement.Application.Students.Queries.GetAllStudents
{
    public class GetAllStudentsQuery
    {
        public PaginationDto Pagination { get; set; }
    }
}
