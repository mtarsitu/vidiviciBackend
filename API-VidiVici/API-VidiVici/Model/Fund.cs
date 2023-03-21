using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Fund: BaseEntity
    {
       
        public string? Name { get; set; }
        public string? Currency {get;set;}
        public int? Period {get;set;}
        public double InterestRate { get; set; }
        public bool Private{ get; set; }
        public ReturningEnum ReturningType { get; set; }
        
        public string? Details {get;set;}
        public string? SecondDetails {get{return GetSecondDetails();}}

        public string GetSecondDetails()
        {
            string type= "";
            string year= (int)ReturningType == 1 ? "an" : "ani";
            if(ReturningType == ReturningEnum.Anualy) {type+="anuala";}
            if(ReturningType == ReturningEnum.Semestrial) {type+="semestriala";}
            if(ReturningType == ReturningEnum.Trimestrial) {type+="trimestriala";}
            if(ReturningType == ReturningEnum.Monthly) {type+="lunara";}
            string details = $"Investitie pe {(int)ReturningType} {year} cu plata dobanzii {type}";
            return details;
        }
    }
}