using StudentManagement.Application.Common;
using StudentManagement.Application.Departments.Events;
using StudentManagement.Application.DTOs.Department;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Departments.Commands.AddDepartment
{
    public class AddDepartmentCommandHandler
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEventQueue _eventQueue;

        public AddDepartmentCommandHandler(IDepartmentRepository departmentRepository, IEventQueue eventQueue)
        {
            _departmentRepository = departmentRepository;
            _eventQueue = eventQueue;
        }

        public async Task<DepartmentDto> Handle(AddDepartmentCommand command)
        {
            var department = new Department
            {
                Name = command.Name
            };

            await _departmentRepository.AddAsync(department);

            await _departmentRepository.SaveChangesAsync();

            _eventQueue.Enqueue(new DepartmentCreatedEvent
            {
                Id = department.Id,
                Name = department.Name
            });

            return new DepartmentDto
            {
                Id = department.Id,
                Name = department.Name
            };
        }
    }
}
