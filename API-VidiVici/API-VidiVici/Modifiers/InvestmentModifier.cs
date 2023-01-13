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
                DateCreated = (DateTime)item.DateCreated,
                Fund = item.Fund
            };
        }
        public static InvestmentDto ToInvestmentDto(Investment item)
        {
            InvestmentDto investmentDto = new InvestmentDto
            {
                Id = item.Id,
          
                InitialInvestmentAmount = item.InitialInvestmentAmout,
                DateCreated = item.DateCreated,
                Fund = item.Fund
            };
            
            return  investmentDto;
        }
    }
}