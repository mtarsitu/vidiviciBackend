using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.DTOs;

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
        public string? PhoneNumber{get;set;}
        public bool TwoFactorEnabled {get;set;}
        public bool UploadedDocuments {get;set;}
        public string? UsedPlatform {get;set;}
        public string? AprovedBy {get;set;}

        public IEnumerable<InformationDto?> InformationDtos {get;set;} = new List<InformationDto>();
    }
}