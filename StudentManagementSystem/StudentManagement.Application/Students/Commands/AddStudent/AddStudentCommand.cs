using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Students.Commands.AddStudent
{
    public class AddStudentCommand
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public int DepartmentId { get; set; }
    }
}
