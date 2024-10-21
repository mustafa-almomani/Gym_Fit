using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.IO;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ProductsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();

            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // POST: api/Products
        [HttpPost]
        public IActionResult PostProduct([FromForm] ProductsDTO productDto)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is required.");
            }

            // Check if image file exists
            if (productDto.Image != null && productDto.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique file name for the image
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + productDto.Image.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the image to the server synchronously
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        productDto.Image.CopyTo(fileStream);
                    }

                    // Create a new product with the image path
                    var product = new Product
                    {
                        CategoryId = productDto.CategoryId,
                        ProductName = productDto.ProductName,
                        Description = productDto.Description,
                        Price = productDto.Price,
                        StockQuantity = productDto.StockQuantity,
                        Image = $"/images/{uniqueFileName}", // Save the image path
                        Discount = productDto.Discount
                    };

                    _context.Products.Add(product);
                    _context.SaveChanges();

                    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }
            else
            {
                return BadRequest("Image file is required.");
            }
        }

        //[HttpDelete("{id}")]
        //public IActionResult DeleteProduct(int id)
        //{
        //    // Try to find the product by its ID
        //    var product = _context.Products.Find(id);

        //    if (product == null)
        //    {
        //        // If the product does not exist, return 404 Not Found
        //        return NotFound(new { Message = "Product not found." });
        //    }

        //    try
        //    {
        //        // Remove the product from the context
        //        _context.Products.Remove(product);

        //        // Save the changes to the database
        //        _context.SaveChanges();

        //        // Return a 204 No Content to indicate successful deletion
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        // Catch any exceptions and return a 500 Internal Server Error
        //        return StatusCode(500, new { Message = "Error deleting product", Details = ex.Message });
        //    }
        //}
        [HttpDelete("deleteproduct/{id}")]
        public IActionResult deleteproduct(int id)
        {
            var deleteproductd = _context.Products.FirstOrDefault(x => x.Id == id);
            _context.Products.Remove(deleteproductd);
            _context.SaveChanges();
            return Ok();

        }

        [HttpPut("updateproduct/{id}")]
        public IActionResult UpdateProduct(int id, [FromForm] ProductsDTO productDto)
        {
            // Check if the product exists
            var existingProduct = _context.Products.FirstOrDefault(x => x.Id == id);
            if (existingProduct == null)
            {
                return NotFound("Product not found.");
            }

            try
            {
                // Update the product's basic fields
                existingProduct.CategoryId = productDto.CategoryId;
                existingProduct.ProductName = productDto.ProductName;
                existingProduct.Description = productDto.Description;
                existingProduct.Price = productDto.Price;
                existingProduct.StockQuantity = productDto.StockQuantity;
                existingProduct.Discount = productDto.Discount;

                // Handle the image upload if a new image is provided
                if (productDto.Image != null && productDto.Image.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique file name for the image
                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + productDto.Image.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the image to the server
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        productDto.Image.CopyTo(fileStream);
                    }

                    // Update the product's image path
                    existingProduct.Image = $"/images/{uniqueFileName}";
                }

                // Save the changes to the database
                _context.Products.Update(existingProduct);
                _context.SaveChanges();

                return Ok(existingProduct);  // Return the updated product
            }
            catch (Exception ex)
            {
                // Handle any errors
                return StatusCode(500, "An error occurred while updating the product.");
            }
        }

    }
}
