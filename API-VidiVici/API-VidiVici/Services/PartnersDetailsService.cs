using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;

namespace API_VidiVici.Services
{
    public class PartnersDetailsService : IServices<PartnersDetails>
    {
        private PartnersDetailsRepository _repository;

        public PartnersDetailsService(PartnersDetailsRepository repository)
        {
            _repository = repository;
        }
        public void Add(PartnersDetails item)
        {
            _repository.Add(item);
        }

        public void Edit(PartnersDetails item)
        {
            _repository.Edit(item);
        }

        public async Task<PartnersDetails?> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<IEnumerable<PartnersDetails>>? GetAll()
        {
            return await _repository.GetAll();
        }

        public void Remove(int id)
        {
            _repository.GetAll();
        }
    }
}