using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.DTOs.Student;

public class StudentDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public int Age { get; set; }

    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = string.Empty;
}
