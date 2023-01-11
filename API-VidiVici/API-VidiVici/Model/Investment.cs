using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Investment
    {
        public int Id{ get; set; }
        public string? ClientId{ get; set; }
        public double InitialInvestmentAmout {get;set;}
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public int FundId {get;set;} 
        public bool RateOnFinal{get;set;}
        public User? Client { get; set; }
        public Fund? Fund{ get; set; }

        

    }
}