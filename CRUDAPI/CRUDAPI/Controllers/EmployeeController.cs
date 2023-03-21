using CRUDAPI.Database;
using CRUDAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext _employeeDbContext;
        public EmployeeController(EmployeeDbContext employeeDbContext)
        {
            this._employeeDbContext = employeeDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var Employees = await _employeeDbContext.Employees.ToListAsync();
            return Ok(Employees);
        }
        [HttpPost]
        public async Task<IActionResult> CreateEmployees([FromBody] Employee emp)
        {
            emp.Id = new Guid();
            await _employeeDbContext.Employees.AddAsync(emp);
            await _employeeDbContext.SaveChangesAsync();
            return Ok(emp);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateEmployees([FromRoute] Guid id, [FromBody] Employee emp)
        {
            var Employee = await _employeeDbContext.Employees.FirstOrDefaultAsync(a => a.Id == id);
            if(Employee != null)
            {
                Employee.Id = id;
                Employee.Name = emp.Name;
                Employee.MobileNumber = emp.MobileNumber;
                Employee.EmailId = emp.EmailId;
                await _employeeDbContext.SaveChangesAsync();

                return Ok(emp);
            }
            else
            {
                return NotFound("Not found");
            }

        }
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteEmployees([FromRoute] Guid id)
        {
            var Employee = await _employeeDbContext.Employees.FirstOrDefaultAsync(a => a.Id == id);
            if (Employee != null)
            {
                _employeeDbContext.Employees.Remove(Employee);
                await _employeeDbContext.SaveChangesAsync();

                return Ok(Employee);
            }
            else
            {
                return NotFound("Not found");
            }

        }
    }
}
