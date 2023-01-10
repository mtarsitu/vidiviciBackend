using API_VidiVici.Model;
using Microsoft.AspNetCore.Identity;

namespace API_VidiVici.Data
{
    public static class DataMemory
   {

       
       public static IEnumerable<PrincipalInvestment> GetPrincipalInvestments()
       {
            return new List<PrincipalInvestment>
            {
                new PrincipalInvestment{
                    Name = "Anual",
                    Roi = 7.5,
                    Private = false,
                    ReturningType = ReturningEnum.Anualy,
                },
                new PrincipalInvestment{
                    Name = "Semestrial",
                    Roi = 5.5,
                    Private = false,
                    ReturningType = ReturningEnum.Montly,
                },
            };
       }
       public static IEnumerable<Investment> GetInvestments()
       {
           return new List<Investment>
           {
               new Investment{
                   ClientId= "e3e07f12-4ba6-4819-b1fe-c42f1dd39989",
                   InvestmentTypeId =1,

               },

               new Investment{
                   ClientId= "e3e07f12-4ba6-4819-b1fe-c42f1dd39989",
                   InvestmentTypeId =1,
               },

               new Investment{
                   ClientId= "e3e07f12-4ba6-4819-b1fe-c42f1dd39989",
                   InvestmentTypeId =2,
               },

               new Investment{
                   ClientId= "e3e07f12-4ba6-4819-b1fe-c42f1dd39989",
                   InvestmentTypeId =1,
               },

               new Investment{
                   ClientId= "e3e07f12-4ba6-4819-b1fe-c42f1dd39989",
                   InvestmentTypeId =1,
               },
           };
       }

       public async static void SetUsers(UserManager<User> userManager){
        var poweruser = new User
                {
                    UserName = "Power",
                    Email = "poweruser@test.com",
                    FirstName = "Power",
                    LastName = "User",
                    
                };
                await userManager.CreateAsync(poweruser, "Pa$$1234");
                await userManager.AddToRoleAsync(poweruser, "Poweruser");
               
                var admin = new User
                {
                    UserName = "Admin",
                    Email = "admin@test.com",
                    FirstName = "Alex",
                    LastName = "Dumitru"
                    
                };
                await userManager.CreateAsync(admin, "Pa$$1234");
                await userManager.AddToRoleAsync(admin,  "Admin" );

                var employee = new User
                {
                    UserName = "Employee",
                    Email = "employee@test.com",
                    FirstName = "Employee First Name",
                    LastName = "Employee Last Name"
                    
                };
                await userManager.CreateAsync(employee, "Pa$$1234");
                await userManager.AddToRoleAsync(employee,  "Employee" );

                var prospect = new User
                {
                    UserName = "Prospect",
                    Email = "prospect@test.com",
                    FirstName = "Prospect First Name",
                    LastName = "Prospect Last Name"
                    
                };
                await userManager.CreateAsync(prospect, "Pa$$1234");
                await userManager.AddToRoleAsync(prospect,  "Employee" );

                var pending = new User
                {
                    UserName = "Pending",
                    Email = "pending@test.com",
                    FirstName = "Pending First Name",
                    LastName = "Pending Last Name"
                    
                };
                await userManager.CreateAsync(pending, "Pa$$1234");
                await userManager.AddToRoleAsync(pending,  "Employee" );

                var investor = new User
                {
                    UserName = "Investor",
                    Email = "investor@test.com",
                    FirstName = "Investor First Name",
                    LastName = "Investor Last Name"
                    
                };
                await userManager.CreateAsync(investor, "Pa$$1234");
                await userManager.AddToRoleAsync(investor,  "Employee" );
       }

    }
}