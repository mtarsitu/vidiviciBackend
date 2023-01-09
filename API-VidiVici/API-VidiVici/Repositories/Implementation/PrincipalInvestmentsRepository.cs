using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;
namespace API_VidiVici.Repositories.Implementation
{
    public class PrincipalInvestmentsRepository : IRepository<PrincipalInvestment>
    {
        private readonly VidiviciContext _context;
        public PrincipalInvestmentsRepository(VidiviciContext context)
        {
            _context = context;
        }
        public void Add(PrincipalInvestment item)
        {
            _context.PrincipalInvestments.Add(item);  
            _context.SaveChanges();
        }

        public void Edit(PrincipalInvestment item)
        {
            _context.PrincipalInvestments.Update(item);
            _context.SaveChanges();
        }

        public async Task<PrincipalInvestment?> Get(int id)
        {
            return await _context.PrincipalInvestments.Where(x=>x.Id ==id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<PrincipalInvestment>>? GetAll()
        {
            return await _context.PrincipalInvestments.ToListAsync();
        }

        public void Remove(int id)
        {
            _context.PrincipalInvestments.Remove(_context.PrincipalInvestments.Single(x=>x.Id ==id));
            _context.SaveChanges();
        }
    }
}