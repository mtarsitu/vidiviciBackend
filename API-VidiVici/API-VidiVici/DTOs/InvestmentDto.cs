using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;

namespace API_VidiVici.DTOs
{
    public class InvestmentDto
    {
        public int Id{get;set;}
        public string? ClientId { get; set; }
        public DateTime? DateCreated {get; set;}
        public PrincipalInvestment? InvestmentType { get; set; }
    }
}