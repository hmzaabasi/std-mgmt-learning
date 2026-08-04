using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Domain.Entities
{
    public class Department
    {
        public int Id { get; set;  }
        public string Name { get; set; } = string.Empty;

        public ICollection<Student> Students { get; set; }=new List<Student>();
    }
}
