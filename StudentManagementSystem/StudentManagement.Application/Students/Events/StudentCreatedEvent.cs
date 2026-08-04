using StudentManagement.Application.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Students.Events
{
    public class StudentCreatedEvent : IIntegrationEvent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public int DepartmentId { get; set; }
    }
}
