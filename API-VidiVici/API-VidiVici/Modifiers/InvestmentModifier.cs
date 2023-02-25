using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.DTOs;
using API_VidiVici.Model;

namespace API_VidiVici.Modifiers
{
    public static class InvestmentModifier
    {
        
        public static Investment ToInvestment(InvestmentDto item)
        {
            return new Investment
            {
                Id = item.Id,
                ClientId = item.ClientId,
                AprovedById = item.AprovedById,
                DateCreated = (DateTime)item.DateCreated,
                DateAproved = item.DateAproved,
                Fund = item.Fund,
                Pending = item.Pending
            };
        }
        public static InvestmentDto ToInvestmentDto(Investment item)
        {
            InvestmentDto investmentDto = new InvestmentDto
            {
                Id = item.Id,
                ClientId = item.ClientId,
                InitialInvestmentAmount = item.InitialInvestmentAmount,
                DateAproved = item.DateAproved,
                DateCreated = item.DateCreated,
                Fund = item.Fund,
                Client = Modifiers.UserModifier.ToUserDto(item.Client),
                LastPayment = item.LastPayment,
                NextPaymentDate = item.NextPaymentDate,
                FinalPaymentDate = item.FinalPaymentDate,
                RateOfInterest =  item.RateOfInterest,
                AprovedById = item.AprovedById,
                Pending = item.Pending,
                Active = item.Active
                
            };
            
            return  investmentDto;
        }

        public static Investment NewToInvestment(NewInvestmentDto investmentDto)
        {
            return new Investment
            {
                ClientId = investmentDto.ClientId,
                InitialInvestmentAmount = investmentDto.InitialInvestmentAmount,
                FundId = investmentDto.FundId,
                RateOnFinal = false,
                Pending = true,
                DateAproved =  DateTime.Parse("0001-01-01T00:00:00"),
            };
        }
    }
}