using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;

namespace API_VidiVici.Services
{
    public class ApplicationService
    {
      private ApplicationRepository _repository;   

      public ApplicationService(ApplicationRepository repository)
      {
            _repository = repository;
      }

      public void Add(Application application)
      {
        _repository.Add(application);
      }
    
      public async Task<Application> Get(string clientId)
      {
        return await _repository.Get(clientId);
      }

      public void AddDocuments(Documents documents){
        _repository.AddDocuments(documents);
      }

    }
}