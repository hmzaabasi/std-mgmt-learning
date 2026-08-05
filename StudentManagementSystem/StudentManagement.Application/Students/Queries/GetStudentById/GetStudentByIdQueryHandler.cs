using StudentManagement.Application.DTOs.Student;
using StudentManagement.Application.Interfaces.Repositories;

namespace StudentManagement.Application.Students.Queries.GetStudentById
{
    public class GetStudentByIdQueryHandler
    {
        private readonly IStudentReadRepository _studentReadRepository;

        public GetStudentByIdQueryHandler(IStudentReadRepository studentReadRepository)
        {
            _studentReadRepository = studentReadRepository;
        }

        public async Task<StudentDto?> Handle(GetStudentByIdQuery query)
        {
            var student = await _studentReadRepository.GetByIdAsync(query.Id);

            if (student == null)
                return null;

            return new StudentDto
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                Age = student.Age,
                DepartmentId = student.DepartmentId,
                DepartmentName = student.Department?.Name ?? string.Empty
            };
        }
    }
}