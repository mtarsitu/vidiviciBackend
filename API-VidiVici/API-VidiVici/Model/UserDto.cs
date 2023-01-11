using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class UserDto
    {
        public string? Id{get;set;}
        public string? Username{get;set;}
        public string? UserRole {get;set;}

        public string? FirstName {get;set;}
        public string? LastName {get;set;}
        public string? Email {get;set;}
    }
}