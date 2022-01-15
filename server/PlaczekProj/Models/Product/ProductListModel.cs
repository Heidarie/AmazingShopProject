namespace PlaczekProj.Models.Product
{
    public class ProductListModel
    {
        public ProductListModel(Models.DatabaseModels.Product product)
        {
            Id = product.Id;
            Name = product.Name;
            Price = product.Price;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
