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
                ClientId = item.ClientId,
                DateCreated = item.DateCreated,
                InvestmentTypeId = item.InvestmentTypeId
            };
        }
        public static InvestmentDto ToInvestmentDto(Investment item)
        {
            return new InvestmentDto
            {
                ClientId = item.ClientId,
                DateCreated = item.DateCreated,
                InvestmentTypeId = item.InvestmentTypeId
            };
        }
    }
}