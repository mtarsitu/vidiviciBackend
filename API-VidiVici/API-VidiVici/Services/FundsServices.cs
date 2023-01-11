using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;
namespace API_VidiVici.Services
{
    public class FundsServices : IServices<Fund>
    {
        private readonly FundsRepository _repository;

        public FundsServices(FundsRepository repository)
        {
            _repository = repository;
        }
        public void Add(Fund item)
        {
            _repository.Add(item);
        }

        public void Edit(Fund item)
        {
            _repository.Edit(item);
        }

        public async Task<Fund?> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<IEnumerable<Fund>>? GetAll()
        {
            return await _repository.GetAll();
        }

        public void Remove(int id)
        {
            _repository.Remove(id);
        }
    }
}