using System.ComponentModel.DataAnnotations;

namespace JwtAuth.Models
{
    public class Employee
    {
            [Key]
            public int EmpId { get; set; }
            public string EmpName { get; set; }
               public string? EmployeeAddress { get; set; }
                public decimal EmployeeSalary { get; set; }
        public int DepartmentId { get; set; }
            public Department  Department { get; set; }
        

    }
}
