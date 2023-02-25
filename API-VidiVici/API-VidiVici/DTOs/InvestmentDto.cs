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
        public DateTime DateAproved {get;set;}
        public DateTime LastPayment {get;set;}
        public DateTime NextPaymentDate { get;set;}
        public DateTime FinalPaymentDate {get;set;}
        public double RateOfInterest {get;set;}
        public string? AprovedById {get;set;}
        public bool Active {get;set;}
        public bool Pending {get;set;}
        public bool RateOnFinal {get;set;}
        public UserDto? Client {get;set;}
        public UserDto? AprovedBy {get;set;}
        public Fund? Fund { get; set; }
       
        // private DateTime GetFinalPaymentDate()
        // {
        
        //     if(Fund.ReturningType == "Anualy"){
        //         return this.DateAproved.AddYears(1);
        //     }
        //     else if(Fund.ReturningType == "Semestrial"){
        //         return this.DateAproved.AddDays(16*7);
        //     }
        //     else if(Fund.ReturningType == "Trimestrial"){
        //         return this.DateAproved.AddDays(13*7);
        //     }else return this.DateAproved.AddMonths(1);
        // }


        // private double GetRateOfInterest()
        // {
        //     return (Fund.InterestRate /100)*InitialInvestmentAmount;
        // }


        // public DateTime GetNextPayment()
        // {

        //     int daysOfWeek = 7;
        //     int daysOfSemester = daysOfWeek * 16;
        //     int daysOfTrimester = daysOfWeek * 13;     
        //     int Anualy = daysOfWeek * 52;
            
        //     if(Fund.ReturningType == "Anualy")
        //     {
        //         RateOnFinal = true;
        //         DatesOfPayment.Add(DateAproved.AddYears(1));
        //         return DateAproved.AddYears(1);

        //     }else if(Fund.ReturningType == "Semestrial" && !this.RateOnFinal)
        //     {
        //         for(int i=0; i<=3;i++){
        //             DatesOfPayment.Add(DateAproved.AddDays((i+1)*daysOfSemester));
        //         }
        //         if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
        //         {   
        //             return this.LastPayment.AddDays(daysOfSemester);
        //         }else{
        //             LastPayment = DateAproved.AddDays(daysOfSemester);
        //             return LastPayment;
        //         }
        //     }else if (Fund.ReturningType =="Trimestial" && !this.RateOnFinal)
        //     {
        //         for(int i=0; i<=4;i++){
        //             DatesOfPayment.Add(DateAproved.AddDays((i+1)*daysOfTrimester));
        //         }
        //         if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
        //         {
        //             return LastPayment.AddDays(daysOfTrimester);
        //         }else{
        //             LastPayment = DateAproved.AddDays(daysOfTrimester);
        //             return LastPayment;
        //         }
        //     }else{
        //         for(int i=0; i<=12;i++){
        //             DatesOfPayment.Add(DateAproved.AddMonths(i+1));
        //         }
        //         if(this.LastPayment!= DateTime.Parse("0001-01-01T00:00:00"))
        //         {
        //             return LastPayment.AddMonths(1);
        //         }else{
        //             LastPayment = DateAproved.AddMonths(1);
        //             return LastPayment;
        //         }
        //     }
        // }
    }
}