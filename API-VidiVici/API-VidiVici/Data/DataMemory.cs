using API_VidiVici.Model;
using Microsoft.AspNetCore.Identity;

namespace API_VidiVici.Data
{
    public static class DataMemory
   {

       
       public static IEnumerable<Fund> GetFunds()
       {
            return new List<Fund>
            {
                new Fund{
                    Name = "Anual",
                    InterestRate = 7.5,
                    Private = false,
                    ReturningType = ReturningType.Anualy,
                    Details ="Fond cu returnare a investitie si dobanzii dupa un an de la creere"
                },
                new Fund{
                    Name = "Semestrial",
                    InterestRate = 6.5,
                    Private = false,
                    ReturningType = ReturningType.Semestrial,
                    Details ="Fond cu plata dobanzii semestriala si returnarea investitiei initiale dupa un an"
                },
                new Fund{
                    Name = "Trimestrial",
                    InterestRate = 5.5,
                    Private = false,
                    ReturningType = ReturningType.Trimestial,
                    Details ="Fond cu plata dobanzii trimestrial si returnarea investitiei initiale dupa un an"
                },
                new Fund{
                    Name = "Montly",
                    InterestRate = 4.5,
                    Private = false,
                    ReturningType = ReturningType.Montly,
                    Details ="Fond cu plata dobanzii lunare si returnarea investitiei initiale dupa un an"
                },
            };
       }
       public static IEnumerable<Investment> GetInvestments()
       {
           return new List<Investment>
           {
            
               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "68265849-41f0-46a0-b972-9b0cb48cc476",
                    FundId =1,
                    RateOnFinal=true,
                    InitialInvestmentAmount= 1000000,
                    Pending = false
               },

               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "68265849-41f0-46a0-b972-9b0cb48cc476",
                    FundId =1,
                    InitialInvestmentAmount= 2000000,
                    Pending = false
               },


               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "f62a555f-9913-4107-aad0-337d04a9add3",
                    FundId =2,
                    InitialInvestmentAmount= 3000000,
                    Pending = false
               },
               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "f62a555f-9913-4107-aad0-337d04a9add3",
                    FundId =1,
                    InitialInvestmentAmount= 4000000,
                    Pending = false
               },
               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "f62a555f-9913-4107-aad0-337d04a9add3",
                    FundId =4,
                    InitialInvestmentAmount= 5000000,
                    Pending = false
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
                    UserRole = UserRole.Poweruser,
                    UsedPlatform = "vidivici"

                };
                await userManager.CreateAsync(poweruser, "Pa$$1234");
                await userManager.AddToRoleAsync(poweruser, "Poweruser");
               
                var admin = new User
                {
                    UserName = "Admin",
                    Email = "admin@test.com",
                    FirstName = "Alex",
                    LastName = "Dumitru",
                    UserRole = UserRole.Admin,
                    UsedPlatform = "vidivici"
                };
                await userManager.CreateAsync(admin, "Pa$$1234");
                await userManager.AddToRoleAsync(admin,  "Admin" );

                var employee = new User
                {
                    UserName = "Employee",
                    Email = "employee@test.com",
                    FirstName = "Employee First Name",
                    LastName = "Employee Last Name",
                    UserRole = UserRole.Employee,
                    UsedPlatform = "vidivici"
                };
                await userManager.CreateAsync(employee, "Pa$$1234");
                await userManager.AddToRoleAsync(employee,  "Employee" );

                var prospect = new User
                {
                    UserName = "Prospect",
                    Email = "prospect@test.com",
                    FirstName = "Prospect First Name",
                    LastName = "Prospect Last Name",
                    UserRole = UserRole.Prospect,
                    UsedPlatform = "vidivici"
                };
                await userManager.CreateAsync(prospect, "Pa$$1234");
                await userManager.AddToRoleAsync(prospect,  "Prospect" );

                var pending = new User
                {
                    UserName = "Pending",
                    Email = "pending@test.com",
                    FirstName = "Pending First Name",
                    LastName = "Pending Last Name",
                    UserRole = UserRole.Pending,
                    UsedPlatform = "vidici"
                };
                await userManager.CreateAsync(pending, "Pa$$1234");
                await userManager.AddToRoleAsync(pending,  "Pending" );

                var investor = new User
                {
                    UserName = "Investor",
                    Email = "investor@test.com",
                    FirstName = "Investor First Name",
                    LastName = "Investor Last Name",
                    UserRole = UserRole.Investor,
                    UsedPlatform = "vidivici"
                };
                await userManager.CreateAsync(investor, "Pa$$1234");
                await userManager.AddToRoleAsync(investor,  "Investor" );

                var secondInvestor = new User
                {
                    UserName = "Secondinvestor",
                    Email = "secondinvestor@test.com",
                    FirstName = "Second Investor First Name",
                    LastName = "Second Investor Last Name",
                    UserRole = UserRole.Investor,
                    UsedPlatform = "vidici"
                };
                await userManager.CreateAsync(secondInvestor, "Pa$$1234");
                await userManager.AddToRoleAsync(secondInvestor,  "Investor" );
       }

        internal static IEnumerable<Information> GetInformations()
        {
            return new List<Information>{
                new Information{
                    UserId = "f62a555f-9913-4107-aad0-337d04a9add3",
                    Cnp = "5020116210753",
                    Address = "Bucuresti, Sos Pipera 61 bl 4 sc 2 et 7 ap 159",
                    Iban = "RO27RZBR2161724926335584",
                    Bank = "Raiffeisen Bank",
                    Cui = "	13919155"
                },
                
                 new Information{
                    UserId = "68265849-41f0-46a0-b972-9b0cb48cc476",
                    Cnp = "5020116210753",
                    Address = "Iasi, Sos Pipera 61 bl 4 sc 2 et 7 ap 159",
                    Iban = "RO27RZBR2161724926335584",
                    Bank = "Raiffeisen Bank",
                    Cui = "	13919155"
                },
                
                 new Information{
                    UserId = "9a5ec134-404d-4289-8fc9-012d3f7e8f0d",
                    Cnp = "5020116210753",
                    Address = "Cluj, Sos Pipera 61 bl 4 sc 2 et 7 ap 159",
                    Iban = "RO27RZBR2161724926335584",
                    Bank = "Raiffeisen Bank",
                    Cui = "	13919155"
                }
            };
        }
    }
}