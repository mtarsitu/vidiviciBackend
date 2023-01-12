using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Repositories.Implementation;
using API_VidiVici.Modifiers;
using API_VidiVici.Model;
using API_VidiVici.DTOs;
namespace API_VidiVici.Services
{
    public class InformationsServices
    {
        private readonly InformationsRepository _repository;
        public InformationsServices(InformationsRepository repository){
            _repository = repository;
        }

        public void Add(Information item)
        {
            _repository.Add(item);
        }

        public void Edit(Information item)
        {
            _repository.Edit(item);
        }

        public async Task<InformationDto?> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<IEnumerable<InformationDto>>? GetAll()
        {
            return await _repository.GetAll();
        }

        public void Remove(int id)
        {
            _repository.Remove(id);
        }

        public async Task<IEnumerable<InformationDto?>> GetByUserId(string id){
            return await _repository.GetByUserId(id);
        }
    }
}