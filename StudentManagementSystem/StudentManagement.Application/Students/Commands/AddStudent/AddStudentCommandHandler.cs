using StudentManagement.Application.DTOs.Student;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Application.Common;
using StudentManagement.Application.Students.Events;
using StudentManagement.Domain.Entities;

namespace StudentManagement.Application.Students.Commands.AddStudent
{
    public class AddStudentCommandHandler
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IEventQueue _eventQueue;

        public AddStudentCommandHandler(
            IStudentRepository studentRepository,
            IDepartmentRepository departmentRepository,
            IEventQueue eventQueue)
        {
            _studentRepository = studentRepository;
            _departmentRepository = departmentRepository;
            _eventQueue = eventQueue;
        }

        public async Task<StudentDto?> Handle(AddStudentCommand command)
        {
            var department = await _departmentRepository.GetByIdAsync(command.DepartmentId);

            if (department == null)
                return null;

            var student = new Student
            {
                Name = command.Name,
                Email = command.Email,
                Age = command.Age,
                DepartmentId = command.DepartmentId
            };

            await _studentRepository.AddAsync(student);
            await _studentRepository.SaveChangesAsync();

            _eventQueue.Enqueue(new StudentCreatedEvent
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                Age = student.Age,
                DepartmentId = student.DepartmentId
            });

            return new StudentDto
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                Age = student.Age,
                DepartmentId = student.DepartmentId,
                DepartmentName = department.Name
            };
        }
    }
}