using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PlaczekProj.Models.DatabaseModels;

namespace PlaczekProj.Entities
{
    public partial class DatabaseEntities : IdentityDbContext<User>
    {
        public DatabaseEntities(DbContextOptions<DatabaseEntities> options) : base(options)
        {
        }

        public DatabaseEntities()
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<UserOrder> UserOrders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=127.0.0.1;port=3306;user=root;password=;database=", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.27-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().ToTable("User");
            builder.Entity<Role>().ToTable("Role");
            builder.Entity<UserOrder>().ToTable("UserOrder").HasKey(e => new { e.Id });
            builder.Entity<Category>().ToTable("Category").HasKey(e => new { e.Id });
            builder.Entity<Product>().ToTable("Product").HasKey(e => new { e.Id });
            builder.Entity<Order>().ToTable("Order").HasKey(e => new { e.Id });
        }

    }
}
