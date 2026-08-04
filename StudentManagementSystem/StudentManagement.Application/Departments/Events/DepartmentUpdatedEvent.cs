using System;
using System.Collections.Generic;
using System.Text;
using StudentManagement.Application.Common;

namespace StudentManagement.Application.Departments.Events
{
    public class DepartmentUpdatedEvent : IIntegrationEvent
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
