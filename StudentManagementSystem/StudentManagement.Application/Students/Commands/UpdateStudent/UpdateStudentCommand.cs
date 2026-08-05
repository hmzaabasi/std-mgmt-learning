using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Students.Commands.UpdateStudent
{
    public class UpdateStudentCommand
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public int DepartmentId { get; set; }
    }
}
