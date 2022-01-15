using static PlaczekProj.Enums.Enums;

namespace PlaczekProj.Models
{
    public class UserDeliveryDetailsModel
    {
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public DeliveryType DeliveryType { get; set; }
    }
}
