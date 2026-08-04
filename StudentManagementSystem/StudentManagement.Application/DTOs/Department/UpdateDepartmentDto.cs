using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.DTOs.Department;

public class UpdateDepartmentDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
}
