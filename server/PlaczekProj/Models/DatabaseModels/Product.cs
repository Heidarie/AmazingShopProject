using PlaczekProj.Models.Product;

namespace PlaczekProj.Models.DatabaseModels
{
    public class Product
    {
        public Product()
        {
        }

        public Product(ProductModel product)
        {
            Id = product.Id;
            Name = product.Name;
            Price = product.Price;
            Description = product.Description;
            StockAmount = product.StockAmount;
            CategoryId = product.CategoryId;
            ImagePath = "";
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int StockAmount { get; set; }
        public Guid CategoryId { get; set; }
        public string ImagePath { get; set; }
    }
}
