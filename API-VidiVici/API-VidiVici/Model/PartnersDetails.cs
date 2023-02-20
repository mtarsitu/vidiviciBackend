using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class PartnersDetails:BaseEntity
    {

        public int PartnerId {get;set;}
        public  int Year {get;set;}
        public double Profit {get;set;}
        public double Debths {get;set;}
        public double Earnings {get;set;}
        public double Ebitda {get;set;}
        public double FixedAssets {get;set;}
        public Partner? Partner {get;set;}
    }
} 