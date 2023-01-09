using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace API_VidiVici.Data
{
    public class DbInitializer
	{
       public async static void Initialize(VidiviciContext context, UserManager<User> userManager)
       {
            if (context.Investments.Any()) return;
              if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "Alex",
                    Email = "alex@test.com",
                    FirstName = "Alex",
                    LastName = "Mitu",
                    
                };
                await userManager.CreateAsync(user, "Pa$$1234");
                await userManager.AddToRoleAsync(user, "Member");
               
                var admin = new User
                {
                    UserName = "Aleca",
                    Email = "admin@test.com",
                    FirstName = "Alex",
                    LastName = "Dumitru"
                    
                };
                await userManager.CreateAsync(admin, "Pa$$1234");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin" });
            }
            context.SaveChanges();
            

            // var Investments = DataMemory.GetInvestments();
            // foreach (Investment investment in Investments)
            // {
            //    context.Investments.Add(investment);
            // }
            // context.SaveChanges();
           
        }
   }
}