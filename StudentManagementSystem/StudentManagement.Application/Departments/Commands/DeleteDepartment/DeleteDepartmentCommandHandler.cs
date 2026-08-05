using StudentManagement.Application.Common;
using StudentManagement.Application.Departments.Events;
using StudentManagement.Application.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Departments.Commands.DeleteDepartment
{
    public class DeleteDepartmentCommandHandler
    {
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEventQueue _eventQueue;

        public DeleteDepartmentCommandHandler(
            IDepartmentRepository departmentRepository,
            IEventQueue eventQueue)
        {
            _departmentRepository = departmentRepository;
            _eventQueue = eventQueue;
        }

        public async Task<bool> Handle(DeleteDepartmentCommand command)
        {
            var department = await _departmentRepository.GetByIdAsync(command.Id);

            if (department == null)
                return false;

            _departmentRepository.Delete(department);

            await _departmentRepository.SaveChangesAsync();

            _eventQueue.Enqueue(new DepartmentDeletedEvent
            {
                Id = command.Id
            });

            return true;
        }
    }
}
