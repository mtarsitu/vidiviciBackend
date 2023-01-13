using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;

namespace API_VidiVici.DTOs
{
    public class InvestmentDto
    {
        public int Id{get;set;}
        public string? ClientId { get; set; }
        public double InitialInvestmentAmount {get;set;}
        public DateTime DateCreated {get; set;}
        public DateTime LastPayment {get;set;}
        public DateTime NextPaymentDate { get {return GetNextPayment();}}
        public DateTime FinalPaymentDate {get{ return GetFinalPaymentDate();}}
        public double RateOfInterest {get{return GetRateOfInterest();}}
        public UserDto? Client {get;set;}
        public bool RateOnFinal {get;set;}
        public Fund? Fund { get; set; }

        private DateTime GetFinalPaymentDate()
        {
            if(Fund.ReturningType == "Anualy"){
                return this.DateCreated.AddYears(1);
            }
            else if(Fund.ReturningType == "Semestrial"){
                return this.DateCreated.AddDays(16*7);
            }
            else if(Fund.ReturningType == "Trimestrial"){
                return this.DateCreated.AddDays(13*7);
            }else return this.DateCreated.AddMonths(1);
        }


        private double GetRateOfInterest()
        {
            return (Fund.InterestRate /100)*InitialInvestmentAmount;
        }


        public DateTime GetNextPayment()
        {

            int daysOfWeek = 7;
            int daysOfSemester = daysOfWeek * 16;
            int daysOfTrimester = daysOfWeek * 13;     
            int Anualy = daysOfWeek * 52;
            
            if(Fund.ReturningType == "Anualy")
            {
                RateOnFinal = true;
                return DateCreated.AddYears(1);

            }else if(Fund.ReturningType == "Semestrial" && !this.RateOnFinal)
            {
                if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
                {   
                    return this.LastPayment.AddDays(daysOfSemester);
                }else{
                    LastPayment = DateCreated.AddDays(daysOfSemester);
                    return LastPayment;
                }
            }else if (Fund.ReturningType =="Trimestial" && !this.RateOnFinal)
            {
                if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
                {
                    return LastPayment.AddDays(daysOfTrimester);
                }else{
                    LastPayment = DateCreated.AddDays(daysOfTrimester);
                    return LastPayment;
                }
            }else{
                if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
                {
                    return LastPayment.AddMonths(1);
                }else{
                    LastPayment = DateCreated.AddMonths(1);
                    return LastPayment;
                }
            }
        }
    }
}