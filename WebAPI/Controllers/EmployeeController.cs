using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Core.EmployeeService;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeServie;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeService employeeServie,IMapper mapper)
        {
            this._employeeServie = employeeServie;
            this._mapper = mapper;
        }

        [HttpGet]
        [Route("GetEmployees")]
        public async Task<ActionResult> GetEmployees()
        {
            var employess = await _employeeServie.GetEmployees();
            return Ok(employess);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployee(int id)
        {
            var employee =  await _employeeServie.GetEmployee(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeDTO employeeDTO)
        {
         
            var employee = _mapper.Map<Employee>(employeeDTO);

            await _employeeServie.AddEmployee(employee);
           
        
            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);

        }



        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(int id, EmployeeDTO employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            if (!await _employeeServie.EditEmployee(employee))
            {
                return BadRequest("Could not update employee");
              
            }

            return Ok(employee);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {

            var result = await _employeeServie.DeleteEmployee(id);
            if (result == false)
            {
                return NotFound();
            }

            return NoContent();
        }


    }
}
