using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlaczekProj.Models.Category;
using PlaczekProj.Models.DatabaseModels;
using PlaczekProj.Models.Product;
using System.Security.Claims;
using static PlaczekProj.Enums.Enums;

namespace PlaczekProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : BaseController
    {
        [HttpGet]
        [Route("Products")]
        public List<ProductModel> GetAllProducts()
        {
            List<ProductModel> productListModel = new List<ProductModel>();
            List<Product> dbProducts = DatabaseManager.GetProducts();
            foreach (Product product in dbProducts)
            {
                productListModel.Add(new ProductModel(product){ Image = GetImage(product.ImagePath) }); 
            }

            return productListModel;
        }
        [HttpPost]
        [Authorize]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductViewModel product)
        {
            if (User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value == "admin")
            {
                product.Price = decimal.Round(product.Price, 2);
                Guid categoryId = DatabaseManager.GetCategoryId(product.Category);
                ProductModel pModel = new ProductModel(product, categoryId);
                bool result = await DatabaseManager.AddProduct(pModel);
                if (result)
                {
                    string uploadPath = await this.UploadFile(product.File, product.Name, product.Category);
                    bool uploaded = await DatabaseManager.UpdateImageInfo(uploadPath, pModel.Id);
                    if (uploaded)
                        return Ok();
                    else
                        return Problem();
                }
                else
                {
                    return Problem();
                }
            }
            return BadRequest();
        }
        [HttpGet]
        [Route("[action]")]
        public List<KeyValuePair<string, Guid>> GetProductsNamesList()
        {
            List<KeyValuePair<string, Guid>> productForDropdown = new List<KeyValuePair<string, Guid>>();
            List<Product> products = DatabaseManager.GetProducts();
            foreach(Product product in products)
            {
                productForDropdown.Add(new KeyValuePair<string, Guid>(product.Name,product.Id));
            }
            return productForDropdown;
        }
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddProductAmount(Guid id, int amount)
        {
            if (User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role).Value == "admin")
            {
                bool result = await DatabaseManager.AddAmount(id, amount);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return Problem();
                }
            }
            return BadRequest();
        }
        [HttpGet]
        [Route("[action]")]
        public List<CategoryViewModel> GetCategories()
        {
            List<CategoryViewModel> categoryViewModels = new List<CategoryViewModel>();
            List<Category> categories = DatabaseManager.GetCategories();
            foreach(Category category in categories)
            {
                int categoriesCounter = DatabaseManager.GetCategoryAmount(category.Id);
                categoryViewModels.Add(new CategoryViewModel(category, categoriesCounter));
            }

            return categoryViewModels;
        }
        [HttpGet]
        [Route("[action]")]
        public List<ProductModel> GetSelectedCategoryProduct(Guid categoryId)
        {
            List<Product> products = DatabaseManager.GetProducts(categoryId);
            List<ProductModel> productModelList = products.Select(x => new ProductModel(x) { Image = GetImage(x.ImagePath) }).ToList();
            return productModelList;
        }
        [HttpGet]
        [Route("[action]")]
        public List<ProductModel> SortProducts(SortType sort, Guid? categoryId)
        {
            if(sort == SortType.Ascending)
            {
                List<Product> products = DatabaseManager.GetProductsSortedAscending(categoryId);
                List<ProductModel> productModelList = products.Select(x => new ProductModel(x) { Image = GetImage(x.ImagePath) }).ToList();
                return productModelList;
            }
            else
            {
                List<Product> products = DatabaseManager.GetProductsSortedDescending(categoryId);
                List<ProductModel> productModelList = products.Select(x => new ProductModel(x) { Image = GetImage(x.ImagePath) }).ToList();
                return productModelList;
            }
        }
        private string GetImage(string path)
        {
            string image = System.Convert.ToBase64String(System.IO.File.ReadAllBytes(path));
            return image;
        }

        private async Task<string> UploadFile(IFormFile file, string name, string category)
        {
            if(file == null)
            {
                return "Content/Products/Images/Default.jpg";
            }
            try
            {
                string fileName = category + "_" + Path.GetFileName(file.FileName);
                string path = Path.Combine("Content/Products/Images",fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return path;
            }
            catch(Exception ex)
            {
                Logger.Error(ex);
                return "Content/Products/Images/Default.jpg";
            }
        }
    }
}
