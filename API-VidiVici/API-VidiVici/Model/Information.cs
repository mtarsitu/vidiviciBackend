using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Information:BaseEntity
    {
        public string UserId { get; set; }

        public string? Cnp {get;set;}

        public DateTime BirthDate{get{return (DateTime)GetBirthDate();}}
        public string? Address { get; set; }
        public string? Iban { get; set; }
        public string? Bank { get; set; }
        public string? Cui { get; set; }
        public User? User {get;set;}
         private DateTime? GetBirthDate()
        {
            if (!string.IsNullOrWhiteSpace(Cnp) && Cnp.Length == 13){
            int yy,mm,dd;
            if (int.TryParse(Cnp.Substring(1, 2), out yy) &&
                int.TryParse(Cnp.Substring(3, 2), out mm) &&
                int.TryParse(Cnp.Substring(5, 2), out dd))
                {
                    // Avoiding a Y2K bug:
                    if (yy <= 30)
                    {
                        yy += 2000; // << Assuming all years 00-30 are 2000-2030
                    }
                    else
                    {
                        yy += 1900; // << Asusming all other years are 19xx
                    }

                    // Creating a real date object:
                    DateTime dateValue = new DateTime(yy, mm, dd); // No need to do mm-1 here!
                    return dateValue;  // << setting the value to the attribute on the entity
                }
            }

            return null;
        }
    }
}