using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Investment:BaseEntity
    {

        public string? ClientId{ get; set; }
        public double InitialInvestmentAmout {get;set;}
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime? DateAproved {get;set;} 
        public int FundId {get;set;} 
        public bool RateOnFinal{get;set;}
        public bool Pending {get;set;}
        public string? AprovedById {get;set;}
        public User? AprovedBy {get;set;}
        public User? Client { get; set; }
        public Fund? Fund{ get; set; }

    }
}