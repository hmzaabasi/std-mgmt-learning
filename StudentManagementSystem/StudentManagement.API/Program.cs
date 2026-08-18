using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudentManagement.Application.Common;
using StudentManagement.Application.Departments.Commands.AddDepartment;
using StudentManagement.Application.Departments.Commands.DeleteDepartment;
using StudentManagement.Application.Departments.Commands.UpdateDepartment;
using StudentManagement.Application.Departments.Queries.GetAllDepartments;
using StudentManagement.Application.Departments.Queries.GetDepartmentById;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Application.Interfaces.Services;
using StudentManagement.Application.Students.Commands.AddStudent;
using StudentManagement.Application.Students.Commands.DeleteStudent;
using StudentManagement.Application.Students.Commands.UpdateStudent;
using StudentManagement.Application.Students.Queries.GetAllStudents;
using StudentManagement.Application.Students.Queries.GetStudentById;
using StudentManagement.Infrastructure.DependencyInjection;
using StudentManagement.Infrastructure.Messaging;
using StudentManagement.Infrastructure.Persistence;
using StudentManagement.Infrastructure.Repositories;
using StudentManagement.Infrastructure.Services;
using System.Text;

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

//Queries for Department
builder.Services.AddScoped<GetDepartmentByIdQueryHandler>();
builder.Services.AddScoped<GetAllDepartmentsQueryHandler>();

//Auth Service
builder.Services.AddScoped<IAuthService, AuthService>();

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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var postgresContext = scope.ServiceProvider.GetRequiredService<PostgreSqlDbContext>();
    await postgresContext.Database.CanConnectAsync();
}

app.UseCors("AllowReact");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();