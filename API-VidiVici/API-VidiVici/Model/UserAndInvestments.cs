using API_VidiVici.DTOs;

namespace API_VidiVici.Model
{
    public class UserAndInvestments
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<Investment>? Investments {get;set;}

    }
}