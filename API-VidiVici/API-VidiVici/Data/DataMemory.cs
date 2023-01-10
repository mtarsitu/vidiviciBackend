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
                   ClientId= "ff7f411e-1aa2-48a0-af77-6836a5337324",
                   InvestmentTypeId =1,

               },

               new Investment{
                   ClientId= "ff7f411e-1aa2-48a0-af77-6836a5337324",
                   InvestmentTypeId =1,
               },

               new Investment{
                   ClientId= "14ef07c0-8cd3-48dd-93ff-5d709c77982f",
                   InvestmentTypeId =2,
               },

               new Investment{
                   ClientId= "14ef07c0-8cd3-48dd-93ff-5d709c77982f",
                   InvestmentTypeId =1,
               },

               new Investment{
                   ClientId= "14ef07c0-8cd3-48dd-93ff-5d709c77982f",
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
                await userManager.AddToRoleAsync(prospect,  "Prospect" );

                var pending = new User
                {
                    UserName = "Pending",
                    Email = "pending@test.com",
                    FirstName = "Pending First Name",
                    LastName = "Pending Last Name"
                    
                };
                await userManager.CreateAsync(pending, "Pa$$1234");
                await userManager.AddToRoleAsync(pending,  "Pending" );

                var investor = new User
                {
                    UserName = "Investor",
                    Email = "investor@test.com",
                    FirstName = "Investor First Name",
                    LastName = "Investor Last Name"
                    
                };
                await userManager.CreateAsync(investor, "Pa$$1234");
                await userManager.AddToRoleAsync(investor,  "Investor" );

                var secondInvestor = new User
                {
                    UserName = "Secondinvestor",
                    Email = "secondinvestor@test.com",
                    FirstName = "Second Investor First Name",
                    LastName = "Second Investor Last Name"
                    
                };
                await userManager.CreateAsync(secondInvestor, "Pa$$1234");
                await userManager.AddToRoleAsync(secondInvestor,  "Investor" );
       }

    }
}