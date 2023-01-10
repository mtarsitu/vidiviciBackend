using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.DTOs
{
    public class InvestmentDto
    {
        public string? ClientId { get; set; }
        public DateTime DateCreated = DateTime.UtcNow;
        public int InvestmentTypeId { get; set; }
    }
}