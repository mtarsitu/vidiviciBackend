using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.DTOs
{
    public class Information
    {
        public int Id {get;set;}
        public int UserId{get;set;}
        public string? Cnp {get;set;}
        public string? Iban{get;set;}
        public string? PhoneNumber{get;set;}
        public DateTime BirthDate{get;set;}

    }
}