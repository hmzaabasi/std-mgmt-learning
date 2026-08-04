using Microsoft.EntityFrameworkCore;

namespace StudentManagement.Infrastructure.Persistence
{
    public class SqlServerDbContext : ApplicationDbContext
    {
        public SqlServerDbContext(DbContextOptions<SqlServerDbContext> options)
            : base(options)
        {
        }
    }
}