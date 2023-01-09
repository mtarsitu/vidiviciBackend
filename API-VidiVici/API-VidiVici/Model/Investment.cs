using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Investment
    {
        public int Id{ get; set; }
        public int ClientId{ get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public int InvestmentTypeId {get;set;}
        public User? Client { get; set; }
        public PrincipalInvestment? InvestmentType{ get; set; }

    }
}