using Microsoft.AspNetCore.Identity;
namespace API_VidiVici.Model
{
    public class User: IdentityUser
    {
        public UserType UserType{get;set;}
        
        public string? FirstName{get;set;}
        public string? LastName {get;set;}

        
        
    }
}