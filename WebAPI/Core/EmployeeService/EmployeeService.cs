using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.DTO;
using WebAPI.Helpers;
using WebAPI.Models;

namespace WebAPI.Core.EmployeeService
{
    public class EmployeeService : IEmployeeService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;

        public EmployeeService(DataContext context,IMapper mapper, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            this._context = context;
            this._mapper = mapper;
            this._hubContext = hubContext;
        }
        public async Task AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);

            Notification notification = new Notification()
            {
                EmployeeName = employee.Name,
                TranType = "Add"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();

        }



        public async Task<bool> EditEmployee(EmployeeDTO employeeDTO)
        {
            var employeefrom = await _context.Employees.FirstOrDefaultAsync(e => e.Id == employeeDTO.Id);

            if(employeefrom == null)
            {
                return false;
            }

            employeefrom =_mapper.Map<Employee>(employeeDTO);

            Notification notification = new Notification()
            {
                EmployeeName = employeefrom.Name,
                TranType = "Edit"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return true;
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return  await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if(employee == null)
            {

                return false;
            }

            _context.Employees.Remove(employee);

            Notification notification = new Notification()
            {
                EmployeeName = employee.Name,
                TranType = "Delete"
            };

            _context.Employees.Remove(employee);
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();


            return true;
        }
    }
}
