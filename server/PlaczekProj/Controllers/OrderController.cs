using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using PlaczekProj.Models;
using PlaczekProj.Models.DatabaseModels;
using PlaczekProj.Models.Order;
using System.Security.Claims;
using static PlaczekProj.Enums.Enums;

namespace PlaczekProj.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : BaseController
    {
        private readonly UserManager<User> userManager;

        public OrderController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        [HttpGet]
        [Route("[action]")]
        public List<OrderModel> GetAllOrderedProducts()
        {
            if (User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value == "admin")
            {
                List<OrderModel> orderList = new List<OrderModel>();
                List<UserOrder> ordersIds = DatabaseManager.GetAllOrders();
                foreach (UserOrder order in ordersIds)
                {
                    OrderModel orderModel = DatabaseManager.GetOrder(order);
                    orderList.Add(orderModel);
                }
                return orderList;
            }
            return null;
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ChangeOrderStatus(Guid orderId, int status)
        {
            if (User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value == "admin")
            {
                KeyValuePair<bool, string> result = await DatabaseManager.ChangeOrderStatus(orderId, (Status)status);
                if (result.Key)
                {
                    User user = await userManager.FindByIdAsync(result.Value);
                    if (user != null)
                    {
                        SendStatusNotification(user, (Status)status);
                        return Ok();
                    }
                }
                return Problem(result.Value);
            }
            return BadRequest();
        }
        [HttpGet]
        [Route("[action]")]
        public async Task<OrderModel> GetOrderedProducts()
        {
            User user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            UserOrder userOrder = DatabaseManager.GetUserOrder(user.Id);
            if (userOrder != null)
            {
                OrderModel order = DatabaseManager.GetOrder(userOrder);
                return order;
            }
            return null;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddToBasket(Guid productId, int amount)
        {
            User user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            bool result = DatabaseManager.AddToBasket(productId, user.Id, amount);
            if (result)
            {
                return Ok();
            }
            else
            {
                return Problem();
            }
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> ConfirmOrder(UserDeliveryDetailsModel model)
        {
            User user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            UserOrder userOrder = DatabaseManager.GetUserOrder(user.Id);
            KeyValuePair<bool, string> result = await DatabaseManager.ChangeOrderStatus(userOrder.OrderId, Status.Potwierdzone);
            if (result.Key)
            {
                try
                {
                    DatabaseManager.AttachUserToBasket(user.Id, Guid.NewGuid());
                    SendConfirmationMail(model, user);
                    return Ok();
                }
                catch(Exception ex)
                {
                    return Problem(string.Format("{0}", ex));
                }
            }
            return Problem(result.Value);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<OrderModel> DeleteProductsFromBasket(List<Guid> productsIds)
        {
            User user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            UserOrder userOrder = DatabaseManager.GetUserOrder(user.Id);
            bool result = await DatabaseManager.DeleteFromBasket(userOrder.OrderId, productsIds);
            OrderModel order = DatabaseManager.GetOrder(userOrder);
            return order;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<List<OrderModel>> GetOrderHistory()
        {
            User user = await userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            List<UserOrder> userOrder = DatabaseManager.GetUserOrderHistory(user.Id);
            List<OrderModel> oModel = new List<OrderModel>();
            if (userOrder != null)
            {
                foreach (var order in userOrder)
                {
                    oModel.Add(DatabaseManager.GetOrderHistory(order));
                }
                return oModel;
            }
            return null;
        }

        private async void SendConfirmationMail(UserDeliveryDetailsModel model, User user)
        {

            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("DoNotReply", "NoReply@sklep.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress(user.Name + " " + user.Surname, user.Email);
            message.To.Add(to);

            message.Subject = "Potwierdzenie zamówienia";

            BodyBuilder bodyBuilder = new BodyBuilder();
            if (model.DeliveryType == DeliveryType.Dostawa)
            {
                bodyBuilder.HtmlBody = "<b>Z przyjemnością informujemy, iż zamówienie zostało potwierdzone!<b><br>" +
                    "Sposób dostawy: " + model.DeliveryType + "<br>" +
                    "Adres wysyłki: " + "<br>" + user.Name + " " + user.Surname + "<br>"
                    + model.Street + "<br>" + model.BuildingNumber + "<br>" + model.City +
                    "<br>" + model.PostalCode;
            }
            else
            {
                bodyBuilder.HtmlBody = "<b>Z przyjemnością informujemy, iż zamówienie zostało potwierdzone!<b><br>" +
                    "Sposób dostawy: " + model.DeliveryType;
                    
            }

            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient smtpClient = new SmtpClient();
            await smtpClient.ConnectAsync("smtp-relay.sendinblue.com", 587, false);
            await smtpClient.AuthenticateAsync("dawidogly@gmail.com", "dqmawKcYWJT8Rvzx");
            await smtpClient.SendAsync(message);
            await smtpClient.DisconnectAsync(true);
            smtpClient.Dispose();
        }

        private async void SendStatusNotification(User user, Status status)
        {

            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress("DoNotReply", "NoReply@sklep.com");
            message.From.Add(from);
            MailboxAddress to = new MailboxAddress(user.Name + " " + user.Surname, user.Email);
            message.To.Add(to);

            message.Subject = "Informacja o zamówieniu";

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = "<b>Informujemy, iż zamówienie zostało zmieniło swój status na:<b><br>" + status;
                
            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient smtpClient = new SmtpClient();
            await smtpClient.ConnectAsync("smtp-relay.sendinblue.com", 587, false);
            await smtpClient.AuthenticateAsync("dawidogly@gmail.com", "dqmawKcYWJT8Rvzx");
            await smtpClient.SendAsync(message);
            await smtpClient.DisconnectAsync(true);
            smtpClient.Dispose();
        }
    }
}
