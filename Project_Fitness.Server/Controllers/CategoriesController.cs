using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.IO;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CategoriesController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _context.Categories.ToList();

            return Ok(categories);
        }

        [HttpGet("getCategoryById/{id}")]
        public IActionResult GetCategory(int id) {
            var category = _context.Categories.Find(id);
            return Ok(category);
        }


        // POST: api/Categories
        [HttpPost]
        public IActionResult PostCategory([FromForm] CategoriesDTO categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest("Invalid category data.");
            }

           
            if (categoryDto.ImageFile != null && categoryDto.ImageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + categoryDto.ImageFile.FileName;
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        categoryDto.ImageFile.CopyTo(fileStream);
                    }

                    var category = new Category
                    {
                        CategoryName = categoryDto.CategoryName,
                        Description = categoryDto.Description,
                        Image = $"/images/{uniqueFileName}" 
                    };

                    _context.Categories.Add(category);
                    _context.SaveChanges();

                    return CreatedAtAction(nameof(GetCategories), new { id = category.Id }, category);
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

        //// PUT: api/Categories/5
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromForm] CategoriesDTO categoryDto)
        {
            if (categoryDto == null)
            {
                return BadRequest("Invalid category data.");
            }

            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            category.CategoryName = categoryDto.CategoryName;
            category.Description = categoryDto.Description;

            if (categoryDto.ImageFile != null && categoryDto.ImageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + categoryDto.ImageFile.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    categoryDto.ImageFile.CopyTo(fileStream);
                }

                category.Image = $"/images/{uniqueFileName}";
            }

            _context.Entry(category).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return NoContent();
        }

        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
