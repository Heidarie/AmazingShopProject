using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using PlaczekProj.Models.DatabaseModels;
using PlaczekProj.Models.Product;
using System.Text.Json.Serialization;

namespace PlaczekProj.Models.Order
{
    public class OrderModel
    {
        public OrderModel(UserOrder userOrder, 
            List<BasketModel> products, decimal orderPrice)
        {
            OrderId = userOrder.OrderId;
            Date = userOrder.ModificationDate;
            Status = (Enums.Enums.Status)userOrder.Status;
            OrderPrice = orderPrice;
            Products = products;
        }

        public Guid OrderId { get; set; }
        public DateTime Date { get; set; }
        public Enums.Enums.Status Status { get; set; }
        public decimal OrderPrice { get; set; }
        public List<BasketModel> Products { get; set; }
    }
}
