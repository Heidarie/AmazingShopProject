namespace PlaczekProj.Models.Product
{
    public class ProductModel
    {
        public ProductModel() { }
        public ProductModel(ProductViewModel pvm, Guid categoryId)
        {
            Id = Guid.NewGuid();
            Name = pvm.Name;
            Price = RoundDecimal(pvm.Price);
            Description = pvm.Description;
            StockAmount = pvm.StockAmount;
            CategoryId = categoryId;
        }

        public ProductModel(Models.DatabaseModels.Product product, Models.DatabaseModels.Category category)
        {
            Id = product.Id;
            Name = product.Name;
            Price = RoundDecimal(product.Price);
            Description = product.Description;
            StockAmount = product.StockAmount;
            CategoryId = product.CategoryId;
            CategoryName = category.Name;
        }
        public ProductModel(Models.DatabaseModels.Product product)
        {
            Id = product.Id;
            Name = product.Name;
            Price = RoundDecimal(product.Price);
            Description = product.Description;
            StockAmount = product.StockAmount;
            CategoryId = product.CategoryId;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }    
        public decimal Price { get; set; }
        public string Description { get; set; } 
        public int StockAmount { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Image { get; set; }


        private decimal RoundDecimal(decimal price)
        {
            price = decimal.Round(price,2);
            return price;
        }
    }
}
