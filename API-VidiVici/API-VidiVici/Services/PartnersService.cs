using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;

namespace API_VidiVici.Services
{
    public class PartnersService: IServices<Partner>
    {
        private readonly PartnerRepository _repository;

        public PartnersService(PartnerRepository repository) 
        {
            _repository = repository;
        }

        public void Add(Partner item)
        {
            _repository.Add(item);
        }

        public void Edit(Partner item)
        {
            _repository.Edit(item);
        }

        public async Task<Partner?> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<IEnumerable<Partner>>? GetAll()
        {
            return await _repository.GetAll();
        }

        public void Remove(int id)
        {
            _repository.Remove(id);
        }
    }
}