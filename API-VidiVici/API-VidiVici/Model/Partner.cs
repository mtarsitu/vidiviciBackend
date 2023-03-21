using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Partner:BaseEntity
    {   
        public string? Name {get;set;}
        public string? CompanyName{get;set;}
        public string? Description {get;set;}
        public string? LogoTitle {get;set;}
        public byte[]? Logo {get;set;}      
    }
}