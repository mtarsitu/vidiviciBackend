using Microsoft.AspNetCore.Identity;
namespace API_VidiVici.Model
{
    public class User: IdentityUser
    {
        
        
        public string? FirstName{get;set;}
        public string? LastName {get;set;}
        public string? UserRole {get;set;}
        public DateTime DateCreated {get;set;} = DateTime.UtcNow;
        public string? UsedPlatform {get;set;}
    }
}