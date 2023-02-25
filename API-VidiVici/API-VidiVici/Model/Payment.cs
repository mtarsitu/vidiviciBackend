using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Payment:BaseEntity
    {
        public string? ClientId{get;set;}

        public int InvestmentId {get;set;}
        public DateTime PaymentDay {get;set;}
        public double PaymentAmount {get;set;}
        public User? Client {get;set;}
        public Investment? Investment {get;set;}
    }
}