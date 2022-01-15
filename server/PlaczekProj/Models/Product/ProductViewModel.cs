namespace PlaczekProj.Models.Product
{
    public class ProductViewModel
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int StockAmount { get; set; }
        public string Category { get; set; }
        public IFormFile? File { get; set; }
    }
}
