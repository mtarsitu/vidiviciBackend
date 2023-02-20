using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.DTOs
{
    public class PartnerDto
    {
        public string? Name {get;set;}
       public string? Description {get;set;}
        public string? LogoTitle {get;set;}
        public IFormFile? Logo {get;set;}
    }
}