using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;

namespace API_VidiVici.Services
{
    public class EventService
    {
        private readonly EventRepository _repository;

        public EventService(EventRepository repository)
        {
            _repository = repository;
        }  

        public void Add(Event newEvent)
        {
            _repository.Add(newEvent);
        }  

        public async Task<IEnumerable<Event>> GetAll()
        {
            return await _repository.GetAll();
        }
    }
}