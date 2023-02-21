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
                },
                new Fund{
                    Name = "Semestrial",
                    InterestRate = 6.5,
                    Private = false,
                    ReturningType = ReturningType.Semestrial,
                },
                new Fund{
                    Name = "Trimestrial",
                    InterestRate = 5.5,
                    Private = false,
                    ReturningType = ReturningType.Trimestial,
                },
                new Fund{
                    Name = "Montly",
                    InterestRate = 4.5,
                    Private = false,
                    ReturningType = ReturningType.Montly,
                },
            };
       }
       public static IEnumerable<Investment> GetInvestments()
       {
           return new List<Investment>
           {
            
               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "36bce7cf-a265-41a9-a9af-1fbeafa3318b",
                    FundId =1,
                    RateOnFinal=true,
                    InitialInvestmentAmout= 1000000,
                    Pending = false
               },

               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "36bce7cf-a265-41a9-a9af-1fbeafa3318b",
                    FundId =1,
                    InitialInvestmentAmout= 2000000,
                    Pending = false
               },


               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "bfa8a9ec-5568-4fdf-83db-bfa901e9eb06",
                    FundId =2,
                    InitialInvestmentAmout= 3000000,
                    Pending = false
               },
               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "bfa8a9ec-5568-4fdf-83db-bfa901e9eb06",
                    FundId =1,
                    InitialInvestmentAmout= 4000000,
                    Pending = false
               },
               new Investment{
                    DateAproved = DateTime.UtcNow,
                    ClientId= "bfa8a9ec-5568-4fdf-83db-bfa901e9eb06",
                    FundId =4,
                    InitialInvestmentAmout= 5000000,
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
                    UserId = "bfa8a9ec-5568-4fdf-83db-bfa901e9eb06",
                    Cnp = "5020116210753",
                    Address = "Bucuresti, Sos Pipera 61 bl 4 sc 2 et 7 ap 159",
                    Iban = "RO27RZBR2161724926335584",
                    Bank = "Raiffeisen Bank",
                    Cui = "	13919155"
                },
                
                 new Information{
                    UserId = "36bce7cf-a265-41a9-a9af-1fbeafa3318b",
                    Cnp = "5020116210753",
                    Address = "Iasi, Sos Pipera 61 bl 4 sc 2 et 7 ap 159",
                    Iban = "RO27RZBR2161724926335584",
                    Bank = "Raiffeisen Bank",
                    Cui = "	13919155"
                },
                
                 new Information{
                    UserId = "834618a9-1824-41d4-9b2a-468716b85d15",
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