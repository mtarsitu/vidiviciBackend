using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.DTOs
{
    public class NewInvestmentDto
    {
        public string? ClientId { get; set; }
        public double InitialInvestmentAmount { get; set; }
        public int FundId { get; set; }       
    }
}