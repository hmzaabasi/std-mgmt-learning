using StudentManagement.Application.Common;
using StudentManagement.Application.Departments.Events;
using StudentManagement.Application.DTOs.Department;
using StudentManagement.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Departments.Commands.UpdateDepartment
{
    public class UpdateDepartmentCommandHandler
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEventQueue _eventQueue;

        public UpdateDepartmentCommandHandler(
            IDepartmentRepository departmentRepository,
            IEventQueue eventQueue)
        {
            _departmentRepository = departmentRepository;
            _eventQueue = eventQueue;
        }

        public async Task<bool> Handle(UpdateDepartmentCommand command)
        {
            var department = await _departmentRepository.GetByIdAsync(command.Id);

            if (department == null)
                return false;

            department.Name = command.Name;

            await _departmentRepository.UpdateAsync(department);

            _eventQueue.Enqueue(new DepartmentUpdatedEvent
            {
                Id = department.Id,
                Name = department.Name
            });

            return true;
        }
    }
}
