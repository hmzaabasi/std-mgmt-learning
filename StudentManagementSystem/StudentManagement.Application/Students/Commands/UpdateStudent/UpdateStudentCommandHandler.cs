using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Application.Common;
using StudentManagement.Application.Students.Events;

namespace StudentManagement.Application.Students.Commands.UpdateStudent
{
    public class UpdateStudentCommandHandler
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEventQueue _eventQueue;

        public UpdateStudentCommandHandler(
            IStudentRepository studentRepository,
            IDepartmentRepository departmentRepository,
            IEventQueue eventQueue)
        {
            _studentRepository = studentRepository;
            _departmentRepository = departmentRepository;
            _eventQueue = eventQueue;
        }

        public async Task<bool> Handle(UpdateStudentCommand command)
        {
            var student = await _studentRepository.GetByIdAsync(command.Id);

            if (student == null)
                return false;

            var department = await _departmentRepository.GetByIdAsync(command.DepartmentId);

            if (department == null)
                return false;

            student.Name = command.Name;
            student.Email = command.Email;
            student.Age = command.Age;
            student.DepartmentId = command.DepartmentId;

            await _studentRepository.UpdateAsync(student);

            _eventQueue.Enqueue(new StudentUpdatedEvent
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                Age = student.Age,
                DepartmentId = student.DepartmentId
            });

            return true;
        }
    }
}