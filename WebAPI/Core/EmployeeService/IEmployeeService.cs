using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Core.EmployeeService
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> GetEmployee(int id);
        Task AddEmployee(Employee employee);
        Task<bool> EditEmployee(EmployeeDTO employee);
        Task<bool> DeleteEmployee(int id);
    }
}
