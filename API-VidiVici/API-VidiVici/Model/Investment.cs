using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Investment:BaseEntity
    {

        public string? ClientId{ get; set; }
        public double InitialInvestmentAmount {get;set;}
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateAproved {get;set;} 
        public DateTime LastPayment {get;set;} = DateTime.Parse("0001-01-01T00:00:00");
        public DateTime NextPaymentDate { get {return GetNextPayment();}}

        public DateTime FinalPaymentDate {get{ return GetFinalPaymentDate();}}
        public int FundId {get;set;} 
        
        public double RateOfInterest {get{return GetRateOfInterest();}}
        public bool RateOnFinal{get;set;}
        public bool Pending {get;set;} = true;
        public bool Active {get;set;}
        public string? AprovedById {get;set;}
        public User? AprovedBy {get;set;}
        public User? Client { get; set; }
        public Fund? Fund{ get; set; }
        
         public DateTime GetNextPayment()
        {

            int daysOfWeek = 7;
            int daysOfSemester = daysOfWeek * 16;
            int daysOfTrimester = daysOfWeek * 13;     
            int Anualy = daysOfWeek * 52;
            
            if(Fund.ReturningType == "Anualy")
            {
                RateOnFinal = true;
            
                return DateAproved.AddYears(1);

            }else if(Fund.ReturningType == "Semestrial" && !this.RateOnFinal)
            {
                if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
                {   
                    return this.LastPayment.AddDays(daysOfSemester);
                }else{
                    return  DateAproved.AddDays(daysOfSemester);
                }
            }else if (Fund.ReturningType =="Trimestial" && !this.RateOnFinal)
            {
               
                if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
                {
                    return LastPayment.AddDays(daysOfTrimester);
                }else{
                    return DateAproved.AddDays(daysOfTrimester);
                }
            }else{
                if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
                {
                    return LastPayment.AddMonths(1);
                }else{
                    return DateAproved.AddMonths(1);
                }
            }
        }
        private double GetRateOfInterest()
        {
            return (Fund.InterestRate / 100)*InitialInvestmentAmount;
        }
        private DateTime GetFinalPaymentDate()
        {
            return DateAproved.AddYears(1);
        }
    }
}