using Microsoft.AspNetCore.Mvc;

namespace API_VidiVici.Services
{
    public class TwoFactorServices
    {
        public  async Task<string> SendTwoFactorCode(string PhoneNumber, string pin)
        {
            string message = $"Codul pentru acces in aplicatia Vidi Vici este{pin}";
            
            string baseUrl = $"https://app.smso.ro/api/v1/send?to={PhoneNumber}&sender=4&body={message}";
            try{
                using(HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Add("X-Authorization","oydINitnQGqhvZoix3YrxC6QhqZnJ5qHnmV6bH82");
                    using(HttpResponseMessage response = await client.GetAsync(baseUrl))
                    {
                        if(response.IsSuccessStatusCode){
                            return "Success";

                        }
                    }    
                }
            }catch(Exception exception)
            {
                return exception.ToString();
            }
            return null;
            
        }
    }
}