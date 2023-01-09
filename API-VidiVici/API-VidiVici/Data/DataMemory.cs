using API_VidiVici.Model;

namespace API_VidiVici.Data
{
    public static class DataMemory
   {

       
       public static IEnumerable<PrincipalInvestment> GetPrincipalInvestments()
       {
            return new List<PrincipalInvestment>
            {
                new PrincipalInvestment{
                    Name = "Anual",
                    Roi = 7.5,
                    Private = false,
                    ReturningType = ReturningEnum.Anualy,
                },
                new PrincipalInvestment{
                    Name = "Semestrial",
                    Roi = 5.5,
                    Private = false,
                    ReturningType = ReturningEnum.Montly,
                },
            };
       }
       public static IEnumerable<Investment> GetInvestments()
       {
           return new List<Investment>
           {
               new Investment{
                   ClientId= 1,
                   InvestmentTypeId =1,

               },

               new Investment{
                   ClientId= 1,
                   InvestmentTypeId =1,
               },

               new Investment{
                   ClientId= 1,
                   InvestmentTypeId =1,
               },

               new Investment{
                   ClientId= 1,
                   InvestmentTypeId =1,
               },

               new Investment{
                   ClientId= 1,
                   InvestmentTypeId =1,
               },
           };
       }

    }
}