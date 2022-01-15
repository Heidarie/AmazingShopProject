namespace PlaczekProj.Models.Order
{
    public class BasketModel
    {
        public BasketModel(Models.DatabaseModels.Product product, int amount)
        {
            Id = product.Id;
            Name = product.Name;
            Price = RoundDecimal(product.Price);
            Description = product.Description;
            Amount = amount;
            CategoryId = product.CategoryId;
            Image = GetImage(product.ImagePath);
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int Amount { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Image { get; set; }
        private decimal RoundDecimal(decimal price)
        {
            price = decimal.Round(price, 2);
            return price;
        }

        private string GetImage(string path)
        {
            string image = System.Convert.ToBase64String(System.IO.File.ReadAllBytes(path));
            return image;
        }
    }
}
