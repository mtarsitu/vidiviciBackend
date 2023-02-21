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
                InitialInvestmentAmount = item.InitialInvestmentAmout,
                DateAproved = item.DateAproved,
                DateCreated = item.DateCreated,
                Fund = item.Fund,
                Client = Modifiers.UserModifier.ToUserDto(item.Client),
            };
            
            return  investmentDto;
        }

        public static Investment NewToInvestment(NewInvestmentDto investmentDto)
        {
            return new Investment
            {
                ClientId = investmentDto.ClientId,
                InitialInvestmentAmout = investmentDto.InitialInvestmentAmount,
                FundId = investmentDto.FundId,
                RateOnFinal = false,
                Pending = true
            };
        }
    }
}