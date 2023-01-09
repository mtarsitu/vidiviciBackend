using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class PrincipalInvestment
    {
        public int Id { get; set;}
        public string? Name { get; set; }
        public double Roi { get; set; }
        public bool Private{ get; set; }
        public ReturningEnum ReturningType { get; set; }
        
    }
}