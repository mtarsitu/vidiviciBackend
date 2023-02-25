using API_VidiVici.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API_VidiVici.data
{
    public class VidiviciDbContext: IdentityDbContext<User>
    {
        public VidiviciDbContext(DbContextOptions options)
        :base(options)
        {

        }

        public DbSet<Investment>? Investments{get;set;}
        public DbSet<Fund>? Funds{get;set;}
        public DbSet<Notification>? Notifications {get;set;}
        public DbSet<Information>? Informations {get;set;}
        public DbSet<Event>? Events {get;set;}
        public DbSet<Application>? Applications {get;set;}

        public DbSet<Partner>? Partners {get;set;}
        public DbSet<PartnersDetails>? PartnersDetails {get;set;}
        public DbSet<Documents>? Documents {get;set;}
        public DbSet<Payment>? Payments {get;set;}
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Investment>().HasOne(i=>i.Client).WithMany().HasForeignKey(d=>d.ClientId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Documents>().HasOne(i=>i.Client).WithMany().HasForeignKey(d=>d.ClientId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Information>().HasOne(i=>i.User).WithMany().HasForeignKey(d=>d.UserId).OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(builder);
            // builder.Entity<Documents>().HasOne(d=>d.Client).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name = "Poweruser", NormalizedName = "POWERUSER" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                new IdentityRole { Name = "Employee", NormalizedName = "EMPLOYEE" },
                new IdentityRole { Name = "Prospect", NormalizedName = "PROSPECT" },
                new IdentityRole { Name = "Pending", NormalizedName = "PENDING" },
                new IdentityRole { Name = "Investor", NormalizedName = "INVESTOR" });
            
        }
        
    }
}