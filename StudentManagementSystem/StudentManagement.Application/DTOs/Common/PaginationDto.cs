using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.DTOs.Common
{
        public class PaginationDto : SortingDto
        {
            public int Page { get; set; } = 1;
            public int PageSize { get; set; } = 10;            
            public string? Search { get; set; }

        }
}
