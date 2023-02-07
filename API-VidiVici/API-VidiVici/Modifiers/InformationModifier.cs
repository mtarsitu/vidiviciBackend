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
                PhoneNumber = information.PhoneNumber,
                Address = information.Address,
                Bank = information.Bank,
                Cui = information.Cui,
                RegComertului = information.RegComertului,
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
                PhoneNumber = information.PhoneNumber,
                Address = information.Address,
                Bank = information.Bank,
                Cui = information.Cui,
                RegComertului = information.RegComertului

                };
            }
            return new Information();
        }
    }
}