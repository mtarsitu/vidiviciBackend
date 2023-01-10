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
            if (!context.PrincipalInvestments.Any())
            { var PrincipalInvestements = DataMemory.GetPrincipalInvestments();
               foreach(PrincipalInvestment principalInvestment in PrincipalInvestements)
               {
                  context.PrincipalInvestments?.Add(principalInvestment);
               }
            context.SaveChanges();
            }
            if(!context.Investments.Any())
            {
            var Investments = DataMemory.GetInvestments();
            foreach (Investment investment in Investments)
            {
               context.Investments?.Add(investment);
            }
            context.SaveChanges();
            }
            return;
           
        }
   }
}