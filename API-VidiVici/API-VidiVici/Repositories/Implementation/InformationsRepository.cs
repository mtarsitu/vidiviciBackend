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
    public class InformationsRepository
    {
        private readonly VidiviciDbContext _context;
        public InformationsRepository(VidiviciDbContext context)
        {
            _context = context;
        }

        public void Add(Information item)
        {
            _context.Informations.Add(item);
            _context.SaveChanges();
        }

        public void Edit(Information item)
        {
           _context.Informations.Update(item);
           _context.SaveChanges();
        }

        public async Task<InformationDto?> Get(int id)
        {
            var information = await _context.Informations.SingleAsync( x => x.Id == id);
            return InformationModifier.ToInformationDto(information);
        }
        

        public async Task<IEnumerable<InformationDto>>? GetAll()
        {
           return (IEnumerable<InformationDto>)await _context.Informations.ToListAsync();
        }

        public void Remove(int id)
        {
            _context.Informations.Remove(_context.Informations.Single(x=>x.Id ==id));
        }
        public async Task<IEnumerable<InformationDto?>> GetByUserId(string id)
        {
            var informations = await _context.Informations.Where(x=>x.UserId == id).ToListAsync();
            List<InformationDto> informationDtos = new List<InformationDto>();
            foreach(Information information in informations){
                informationDtos.Add(InformationModifier.ToInformationDto(information));
            }
            return informationDtos;
        }
    }
}