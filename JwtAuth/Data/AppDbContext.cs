using Microsoft.EntityFrameworkCore;
using JwtAuth.Models; 

namespace JwtAuth.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

       
        public DbSet<Employee> Employees { get; set; }
    }
}
