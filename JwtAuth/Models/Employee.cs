using System.ComponentModel.DataAnnotations;

namespace JwtAuth.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }
        public string EmpName { get; set; }
    }
}
