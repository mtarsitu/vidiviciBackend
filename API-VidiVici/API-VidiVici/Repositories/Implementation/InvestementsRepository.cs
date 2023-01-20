using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.DTOs;
using API_VidiVici.Model;
using API_VidiVici.Modifiers;
using Microsoft.EntityFrameworkCore;

namespace API_VidiVici.Repositories.Implementation
{
    public class InvestementsRepository 
    {
        private VidiviciDbContext _context;
        public InvestementsRepository(VidiviciDbContext context)
        {
            _context = context;
        }
        public void Add(InvestmentDto item)
        {
            _context.Investments?.Add(InvestmentModifier.ToInvestment(item));
            _context.SaveChanges();
        }

        public void Edit(InvestmentDto item)
        {
            _context.Investments?.Update(InvestmentModifier.ToInvestment(item));
            _context.SaveChanges();
        }

        public async Task<Investment?> Get(int id)
        {
            var investment = await _context.Investments
            .Include(t=>t.Fund)
            .SingleAsync( x => x.Id == id);
            return  investment;
        }

        public async Task<IEnumerable<InvestmentDto>> GetAll()
        {
            List<InvestmentDto> investmentDtos = new List<InvestmentDto>();
            List<Investment> investments = await _context.Investments.Include(i=>i.Fund).Include(i=>i.Client).ToListAsync();
            foreach(Investment investment in investments ){
                investmentDtos.Add(InvestmentModifier.ToInvestmentDto(investment));
            }
            return investmentDtos;
        }

        public void Remove(int id)
        {
            _context.Investments.Remove(_context.Investments.Single(x=> x.Id==id));
            _context.SaveChanges();
        }
        public async Task<IEnumerable<Investment>> GetUserInvestment(string id)
        {
            return await _context.Investments
            .Include(t=> t.Fund)
            .Where(x=>x.ClientId == id)
            .ToListAsync();
        }

        public async Task<double> GetTotalSum()
        {
            double total = 0;
            var investments = await _context.Investments.ToListAsync();
            foreach(Investment investment in investments)
            {
                total += investment.InitialInvestmentAmout;
            }
            return total;
        }
    }
}