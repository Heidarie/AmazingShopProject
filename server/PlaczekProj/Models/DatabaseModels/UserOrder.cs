
namespace PlaczekProj.Models.DatabaseModels
{
    public class UserOrder
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public Guid OrderId { get; set; }
        public DateTime ModificationDate { get; set; }
        public int Status { get; set; }
    }

   
}
