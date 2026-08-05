using Microsoft.EntityFrameworkCore;
using StudentManagement.Application.Common;
using StudentManagement.Application.Departments.Commands.AddDepartment;
using StudentManagement.Application.Departments.Commands.DeleteDepartment;
using StudentManagement.Application.Departments.Commands.UpdateDepartment;
using StudentManagement.Application.Departments.Queries.GetAllDepartments;
using StudentManagement.Application.Departments.Queries.GetDepartmentById;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Application.Students.Commands.AddStudent;
using StudentManagement.Application.Students.Commands.DeleteStudent;
using StudentManagement.Application.Students.Commands.UpdateStudent;
using StudentManagement.Application.Students.Queries.GetAllStudents;
using StudentManagement.Application.Students.Queries.GetStudentById;
using StudentManagement.Infrastructure.DependencyInjection;
using StudentManagement.Infrastructure.Messaging;
using StudentManagement.Infrastructure.Persistence;
using StudentManagement.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddInfrastructure(builder.Configuration);


builder.Services.AddSingleton<IEventQueue, InMemoryEventQueue>();
builder.Services.AddHostedService<PostgresSyncWorker>();
builder.Services.AddScoped<IStudentReadRepository, StudentReadRepository>();

//Commands for Student
builder.Services.AddScoped<AddStudentCommandHandler>();
builder.Services.AddScoped<UpdateStudentCommandHandler>();
builder.Services.AddScoped<DeleteStudentCommandHandler>();

//Queries for Student
builder.Services.AddScoped<GetStudentByIdQueryHandler>();
builder.Services.AddScoped<GetAllStudentsQueryHandler>();

//Commands for Department
builder.Services.AddScoped<AddDepartmentCommandHandler>();
builder.Services.AddScoped<UpdateDepartmentCommandHandler>();
builder.Services.AddScoped<DeleteDepartmentCommandHandler>();
builder.Services.AddScoped<AddDepartmentCommandHandler>();
builder.Services.AddScoped<UpdateDepartmentCommandHandler>();
builder.Services.AddScoped<DeleteDepartmentCommandHandler>();

//Queries for Department
builder.Services.AddScoped<GetDepartmentByIdQueryHandler>();
builder.Services.AddScoped<GetAllDepartmentsQueryHandler>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowReact");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
