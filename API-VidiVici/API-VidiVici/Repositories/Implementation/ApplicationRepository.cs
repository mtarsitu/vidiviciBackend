using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;

namespace API_VidiVici.Repositories.Implementation
{
    public class ApplicationRepository
    {
        private VidiviciDbContext _context;

        public ApplicationRepository(VidiviciDbContext context)
        {
            _context = context;
        }

        public void Add(Application application)
        {
            _context.Applications.Add(application);
            _context.SaveChanges();
        }

        public async Task<Application> Get(string clientId)
        {
            return await _context.Applications.SingleAsync(a=>a.ClientId == clientId);
        }
    }
}