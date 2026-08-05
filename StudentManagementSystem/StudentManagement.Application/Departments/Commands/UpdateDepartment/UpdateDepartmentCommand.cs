using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Departments.Commands.UpdateDepartment
{
    public class UpdateDepartmentCommand
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
