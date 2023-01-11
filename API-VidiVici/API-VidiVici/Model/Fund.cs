using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Fund
    {
        public int Id { get; set;}
        public string? Name { get; set; }
        public double InterestRate { get; set; }
        public bool Private{ get; set; }
        public string? ReturningType { get; set; }
        
    }
}