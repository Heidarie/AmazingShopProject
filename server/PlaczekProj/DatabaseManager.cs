using log4net;
using PlaczekProj.Entities;
using PlaczekProj.Models.DatabaseModels;
using PlaczekProj.Models.Order;
using PlaczekProj.Models.Product;
using static PlaczekProj.Enums.Enums;

namespace PlaczekProj
{
    public class DatabaseManager : IDisposable
    {
        protected ILog Logger;
        DatabaseEntities dbContext;
        public DatabaseManager()
        {
            dbContext = new DatabaseEntities();
            Logger = LogManager.GetLogger(this.GetType());
        }

        public List<Product> GetProducts()
        {
            List<Product> products = new List<Product>();  
            products = dbContext.Products.ToList();
            return products;
        }

        public List<Product> GetProducts(Guid categoryId)
        {
            List<Product> products = new List<Product>();
            products = dbContext.Products.Where(p => p.CategoryId == categoryId).ToList();
            return products;
        }

        public List<Product> GetProductsSortedAscending(Guid? categoryId)
        {
            List<Product> products = new List<Product>();
            if (categoryId == null)
            {
                products = dbContext.Products.OrderBy(p => p.Price).ToList();
            }
            else
            {
                
                products = dbContext.Products.Where(p => p.CategoryId == categoryId).OrderBy(p => p.Price).ToList();
            }
            return products;
        }

        public List<Product> GetProductsSortedDescending(Guid? categoryId)
        {
            List<Product> products = new List<Product>();
            if (categoryId == null)
            {
                products = dbContext.Products.OrderByDescending(p => p.Price).ToList();
            }
            else
            {
                products = dbContext.Products.Where(p => p.CategoryId == categoryId).OrderByDescending(p => p.Price).ToList();
            }
            return products;
        }

        public async Task<bool> AddProduct(ProductModel product)
        {
            var ifExist =  dbContext.Products.Where(x => x.Name == product.Name).FirstOrDefault();
            if(ifExist != null)
            {
                return false;
            }
            var prod = dbContext.Products.AddAsync(new Product(product));
            if (prod.IsCompletedSuccessfully)
            {
                dbContext.SaveChanges();
                return prod.IsCompletedSuccessfully;
            } else
            {
                return prod.IsCompletedSuccessfully;
            }
        }

        public async Task<bool> UpdateImageInfo(string path, Guid prodId)
        {
            Product prod = dbContext.Products.First(p => p.Id == prodId);
            prod.ImagePath = path;
            int result = await dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public Guid GetCategoryId(string categoryName)
        {
            Category category = dbContext.Categories.Where(c => c.Name == categoryName).FirstOrDefault();
            if (category == null)
            {
                category = new Category(categoryName);
                dbContext.Categories.Add(category);
                dbContext.SaveChanges();
            }
            Guid id = category.Id;
            return id;
        }

        public void AttachUserToBasket(string userId, Guid basketId)
        {
            UserOrder uo = new UserOrder();
            uo.Id = Guid.NewGuid();
            uo.UserId = userId;
            uo.OrderId = basketId;
            dbContext.UserOrders.Add(uo);
            dbContext.SaveChanges();
        }

        public bool DoesBasketExist(string userId)
        {
            UserOrder uOrder = dbContext.UserOrders.FirstOrDefault(p => p.UserId == userId);
            if(uOrder == null)
            {
                return false;
            }
            return true;
        }

        public ProductModel GetProduct(Guid id)
        {
            Product product = dbContext.Products.SingleOrDefault(p => p.Id == id);
            Category category = dbContext.Categories.SingleOrDefault(c => c.Id == product.CategoryId);
            if (product == null && category == null)
            {
                Logger.Error("Item with specified id was not found");
                return null;
            }
            else
            {
                ProductModel productModel = new ProductModel(product, category);
                return productModel;
            }
        }

        public async Task<bool> AddAmount(Guid id, int amount)
        {
            Product product = dbContext.Products.SingleOrDefault(p => p.Id == id);
            int prodAmount = product.StockAmount;
            prodAmount = prodAmount + amount;
            product.StockAmount = prodAmount;
            int result = await dbContext.SaveChangesAsync();
            return result == 1 ? true : false;
        }

        public List<Category> GetCategories()
        {
            List<Category> categories = dbContext.Categories.ToList();
            return categories;
        }

        public int GetCategoryAmount(Guid id)
        {
            int result = 0;
            List<Product> products = dbContext.Products.Where(p => p.CategoryId == id).ToList();
            foreach (Product product in products)
            {
                result++;
            }
            return result;
        }

        public List<UserOrder> GetAllOrders()
        {
            List<UserOrder> orders = dbContext.UserOrders.Where(p => p.Status != (int)Status.Koszyk).ToList();
            return orders;
        }

        public OrderModel GetOrder(UserOrder userOrder)
        {
            decimal totalPrice;
            List<Order> orders = dbContext.Orders.Where(p => p.OrderId == userOrder.OrderId).ToList();
            List<Product> products = GetOrderedProducts(orders, out totalPrice);
            List<BasketModel> productModels = products.Select(p => new BasketModel(p, orders.Where(k => k.ProductId == p.Id).Sum(k => k.Amount))).ToList();
            OrderModel orderModel = new OrderModel(userOrder, productModels, decimal.Round(totalPrice, 2));
            return orderModel;
        }

        public async Task<KeyValuePair<bool,string>> ChangeOrderStatus(Guid orderId, Status status)
        {
            UserOrder order = dbContext.UserOrders.Where(p => p.OrderId == orderId).FirstOrDefault();
            bool dbResult;

            if (status == Status.Potwierdzone)
            {
                Product prod = this.ValidateProductAmonunt(orderId);
                if (prod == null)
                {
                    order.Status = (int)status;
                    order.ModificationDate = DateTime.Now;
                    dbResult = await dbContext.SaveChangesAsync() == 1 ? true : false;
                    if (dbResult)
                        return new KeyValuePair<bool, string>(true,"ok");
                }
                else
                {
                    return new KeyValuePair<bool, string>(false, String.Format("Masz za duża ilość produktu {0} w koszyku! Jego obecny stan na magazynie to: {1}", prod.Name, prod.StockAmount));
                }
            }
            order.Status = (int)status;
            dbResult = await dbContext.SaveChangesAsync() == 1 ? true : false;
            if (dbResult)
                return new KeyValuePair<bool, string>(true,order.UserId);
            return new KeyValuePair<bool, string>(false, "An error occured");
        }

        public UserOrder GetUserOrder(string userId)
        {
            UserOrder order = dbContext.UserOrders.Where(p => p.UserId == userId && p.Status == (int)Status.Koszyk).FirstOrDefault();
            return order;
        }

        public List<UserOrder> GetUserOrderHistory(string userId)
        {
            List<UserOrder> order = dbContext.UserOrders.Where(p => p.UserId == userId && p.Status != (int)Status.Koszyk).ToList();
            return order;
        }

        public bool AddToBasket(Guid productId, string userId, int amount)
        {
            UserOrder uOrder = GetUserOrder(userId);
            Order order = dbContext.Orders.Where(p => p.OrderId == uOrder.OrderId && p.ProductId == productId).FirstOrDefault();
            if (order == null)
            {
                order = new Order();
                order.Id = Guid.NewGuid();
                order.ProductId = productId;
                order.OrderId = uOrder.OrderId;
                order.Amount = amount;
                dbContext.Orders.Add(order);
            }
            else
            {
                order.Amount += amount;
            }
            int result = dbContext.SaveChanges();
            return result == 1 ? true : false; 
        }

        public async Task<bool> DeleteFromBasket(Guid orderId, List<Guid> products)
        {
            foreach(Guid product in products)
            {
                Order order = dbContext.Orders.Where(p => p.OrderId == orderId && p.ProductId == product).FirstOrDefault();
                dbContext.Orders.Remove(order);
            }
            int result = await dbContext.SaveChangesAsync();
            return result == 1 ? true: false;
        }

        public OrderModel GetOrderHistory(UserOrder userOrder)
        {
            decimal totalPrice;
            List<Order> orders = dbContext.Orders.Where(p => p.OrderId == userOrder.OrderId).ToList();
            List<Product> products = GetOrderedProducts(orders, out totalPrice);
            List<BasketModel> productModels = products.Select(p => new BasketModel(p, orders.Where(k => k.ProductId == p.Id).Sum(k => k.Amount))).ToList();
            OrderModel orderModel = new OrderModel(userOrder, productModels, decimal.Round(totalPrice, 2));
            return orderModel;
        }

        private List<Product> GetOrderedProducts(List<Order> orders, out decimal totalPrice)
        {
            totalPrice = 0;
            List<Product> products = new List<Product>();
            foreach(Order order in orders)
            {
                Product product = dbContext.Products.Where(p => p.Id == order.ProductId).FirstOrDefault();
                products.Add(product);
                totalPrice += product.Price * order.Amount;
            }
            return products;
        }

        private Product ValidateProductAmonunt(Guid orderId)
        {
            List<Order> orders = dbContext.Orders.Where(p => p.OrderId == orderId).ToList();
            foreach(Order order in orders)
            {
                Product prod = dbContext.Products.Where(p => p.Id == order.ProductId).FirstOrDefault();
                if((prod.StockAmount - order.Amount) < 0)
                {
                    return prod;
                }
                prod.StockAmount -= order.Amount;
            }
            dbContext.SaveChanges();
            return null;
        }

        public void Dispose() 
        { 
            this.dbContext.Dispose();  
        }
    }
}
