using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.AspNetCore.Identity;

namespace API_VidiVici.Data
{
    public class DbInitializer
	{
       public static void Initialize(VidiviciDbContext context, UserManager<User> userManager)
       {
            if (!userManager.Users.Any())
            {
                DataMemory.SetUsers(userManager);
                context.SaveChanges();
            }
            //if (!context.Funds.Any())
            //{ var funds = DataMemory.GetFunds();
            //   foreach(Fund fund in funds)
            //   {
            //      context.Funds?.Add(fund);
            //   }
            //context.SaveChanges();
            //}
            //if(!context.Investments.Any())
            //{
            //var Investments = DataMemory.GetInvestments();
            //foreach (Investment investment in Investments)
            //{
            //   context.Investments?.Add(investment);
            //}
            //context.SaveChanges();
            //}

            //if(!context.Informations.Any())
            //{
            //   var informations = DataMemory.GetInformations();
            //   foreach (Information information in informations)
            //{
            //   context.Informations?.Add(information);
            //}
            //context.SaveChanges();
            //}
            return;         
        }
   }
}