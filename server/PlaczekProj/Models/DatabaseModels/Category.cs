namespace PlaczekProj.Models.DatabaseModels
{
    public class Category
    {
        public Category(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }   
    }
}
