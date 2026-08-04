using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.DTOs.Common;

public class SortingDto
{
    public string SortBy { get; set; } = "Id";

    public string SortOrder { get; set; } = "asc";
}
