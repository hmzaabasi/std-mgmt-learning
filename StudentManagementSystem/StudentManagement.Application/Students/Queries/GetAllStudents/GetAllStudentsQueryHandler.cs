using StudentManagement.Application.DTOs.Student;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.Interfaces.Repositories;

namespace StudentManagement.Application.Students.Queries.GetAllStudents
{
    public class GetAllStudentsQueryHandler
    {
        private readonly IStudentReadRepository _studentReadRepository;

        public GetAllStudentsQueryHandler(IStudentReadRepository studentReadRepository)
        {
            _studentReadRepository = studentReadRepository;
        }

        public async Task<PagedResult<StudentDto>> Handle(GetAllStudentsQuery query)
        {
            var result = await _studentReadRepository.GetAllAsync(query.Pagination);

            var studentDtos = result.Students.Select(student => new StudentDto
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                Age = student.Age,
                DepartmentId = student.DepartmentId,
                DepartmentName = student.Department?.Name ?? string.Empty
            });

            return new PagedResult<StudentDto>
            {
                Items = studentDtos,
                Page = query.Pagination.Page,
                PageSize = query.Pagination.PageSize,
                TotalRecords = result.TotalRecords
            };
        }
    }
}