using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Infrastructure.Persistence;
using StudentManagement.Infrastructure.Repositories;

namespace StudentManagement.Infrastructure.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<SqlServerDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("SqlServer"),
                    x => x.MigrationsAssembly("StudentManagement.Migrations.SqlServer")));

            services.AddDbContext<PostgreSqlDbContext>(options =>
                options.UseNpgsql(
                    configuration.GetConnectionString("PostgreSql"),
                    x => x.MigrationsAssembly("StudentManagement.Migrations.PostgreSql")));

            services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<IStudentReadRepository, StudentReadRepository>();
            services.AddScoped<IDepartmentReadRepository, DepartmentReadRepository>();

            return services;
        }
    }
}