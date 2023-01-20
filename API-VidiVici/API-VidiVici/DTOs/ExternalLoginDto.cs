using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.DTOs
{
    public class ExternalLoginDto
    {
        public string? FirstName { get; set;}
        public string? LastName { get; set; }
        public string? Email { get; set; }        
        public string? UsedPlatform { get; set; }
    }
}