using System.ComponentModel.DataAnnotations;

namespace CRUDAPI.Models
{
    public class Employee
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string EmailId { get; set; }
    }
}
