using StudentManagement.Application.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Students.Events
{
    public class StudentDeletedEvent : IIntegrationEvent
    {
        public int Id { get; set; }
    }
}