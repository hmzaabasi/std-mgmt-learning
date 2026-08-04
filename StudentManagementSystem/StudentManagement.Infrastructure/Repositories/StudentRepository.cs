using Microsoft.EntityFrameworkCore;
using StudentManagement.Application.DTOs.Common;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Domain.Entities;
using StudentManagement.Infrastructure.Persistence;

namespace StudentManagement.Infrastructure.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly SqlServerDbContext _sqlContext;

        public StudentRepository(SqlServerDbContext sqlContext)
        {
            _sqlContext = sqlContext;
        }

        public async Task<Student?> GetByIdAsync(int id)
        {
            return await _sqlContext.Students
                .Include(s => s.Department)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task AddAsync(Student student)
        {
            await _sqlContext.Students.AddAsync(student);
        }

        public async Task UpdateAsync(Student student)
        {
            var sqlStudent = await _sqlContext.Students
        .FirstOrDefaultAsync(s => s.Id == student.Id);


            if (sqlStudent != null)
            {
                sqlStudent.Name = student.Name;
                sqlStudent.Email = student.Email;
                sqlStudent.Age = student.Age;
                sqlStudent.DepartmentId = student.DepartmentId;
            }

            await _sqlContext.SaveChangesAsync();
        }
        public void Delete(Student student)
        {
            var sqlStudent = _sqlContext.Students.Find(student.Id);
            if (sqlStudent != null)
                _sqlContext.Students.Remove(sqlStudent);

        }

        public async Task SaveChangesAsync()
        {
            await _sqlContext.SaveChangesAsync();
        }
    }
}