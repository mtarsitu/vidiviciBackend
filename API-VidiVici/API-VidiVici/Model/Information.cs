using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Information
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public string? Cnp {get;set;}

        public DateTime BirthDate{get;set;}
        public string? Address { get; set; }
        public string? Iban { get; set; }
        public string? Bank { get; set; }
        public string? Cui { get; set; }
        public string? RegComertului { get; set; }
        public int? Salary { get; set; }
    
        public DateTime? DateEmployedEmployementDate { get; set; } = DateTime.UtcNow;
        public User? User {get;set;}

    }
}