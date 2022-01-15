namespace PlaczekProj.Models.Category
{
    public class CategoryViewModel
    {
        public CategoryViewModel(Models.DatabaseModels.Category category, int amount)
        {
            this.Id = category.Id;
            this.Name = category.Name;
            this.Amount = amount;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }    
    }
}
