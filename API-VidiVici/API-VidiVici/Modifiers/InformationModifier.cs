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
                BirthDate = information.BirthDate,   
                Address = information.Address,
                Bank = information.Bank,
                Cui = information.Cui
            };
        }
        public static Information ToInformation(InformationDto information)
        {
            if(information != null && information.UserId!=null)
            {
            return new Information{
                Id = information.Id,
                UserId = information.UserId,
                Cnp = information.Cnp,
                Iban = information.Iban,
                Address = information.Address,
                Bank = information.Bank,
                Cui = information.Cui

                };
            }
            return new Information();
        }
    }
}