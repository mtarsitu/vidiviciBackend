using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.DTOs;
using API_VidiVici.Model;

namespace API_VidiVici.Modifiers
{
    public static class InformationModifier
    {
        public static InformationDto ToInformationDto(Information information)
        {
            return new InformationDto{
                Id = information.Id,
                UserId = information.UserId,
                Cnp = information.Cnp,
                Iban = information.Iban,
                // PhoneNumber = information.User.PhoneNumber,
                Address = information.Address,
                Bank = information.Bank,
                Cui = information.Cui,
                RegComertului = information.RegComertului,
                Salary = information.Salary,
            };
        }
        public static Information ToInformation(InformationDto information)
        {
            return new Information{
                Id = information.Id,
                UserId = information.UserId,
                Cnp = information.Cnp,
                Iban = information.Iban,
                Address = information.Address,
                Bank = information.Bank,
                Cui = information.Cui,
                RegComertului = information.RegComertului,
                Salary = information.Salary,
            };
        }
    }
}