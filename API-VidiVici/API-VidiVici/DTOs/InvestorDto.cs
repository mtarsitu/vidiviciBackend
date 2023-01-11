using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;

namespace API_VidiVici.DTOs
{
    public class InvestorDto
    {
        
        public string? Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public List<InvestmentDto>? Investments {get;set;}

        public List<InformationDto>? Informations {get;set;}

    }
}