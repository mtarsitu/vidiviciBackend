using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API_VidiVici.data
{
    public class VidiviciContext: IdentityDbContext<User>
    {
        public VidiviciContext(DbContextOptions options)
        :base(options)
        {

        }

        public DbSet<Investment>? Investments{get;set;}
        public DbSet<PrincipalInvestment>? PrincipalInvestments{get;set;}
         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" });
        }
        
    }
}