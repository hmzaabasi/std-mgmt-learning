using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Domain.Entities
{
    public class Student
    {
       public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
       public string Email {  get; set; } = string.Empty;
        public int Age { get; set; }

        public int DepartmentId { get; set; }

        public Department ? Department { get; set; }
    }
}
