using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly MyDbContext _db;
        public RecipeController(MyDbContext db)
        {
            _db = db;
        }
        [HttpGet("Nutrition/GetAllRescipe")]
        public IActionResult GetAllRescipe()
        {
            var recipe = _db.Recipes.ToList();
            if (recipe == null)
            {
                return NoContent();
            }
            return Ok(recipe);
        }
        [HttpGet("Nutrition/GetRecipeById/{id}")]
        public IActionResult GetRecipeById(int id) {
            if (id <= 0) { 
                return BadRequest("Invalid Recipe ID");
            }
            var recipe = _db.Recipes.Where(p => p.RecipeId == id).FirstOrDefault();
            if (recipe == null) 
            { 
                return NotFound("No Recipe found for the given Recipe ID");
            }
            return Ok(recipe);
        }

        [HttpPost("Nutrition/CreateRecipe")]
        public IActionResult CreateRecipe([FromForm] RecipeDTO recipeDTO)
        {
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

          

          
            var imageFilePath = Path.Combine(uploadFolder, recipeDTO.RecipeImage.FileName);

            if (imageFilePath == null)
            {

                using (var stream = new FileStream(imageFilePath, FileMode.Create))
                {
                    recipeDTO.RecipeImage.CopyTo(stream);
                }

            }
          
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid Recipe");
            }

         
            var recipe = new Recipe
            {
                RecipeName = recipeDTO.RecipeName,
                RecipeImage = recipeDTO.RecipeImage.FileName,
            };

            _db.Recipes.Add(recipe);
            _db.SaveChanges(); 

            return Ok(recipe);
        }

        [HttpPut("Nutrition/UpdateRecipe/{id}")]
        public IActionResult UpdateRecipe([FromForm] RecipeDTO recipeDTO, int id)
        {
            var recipe = _db.Recipes.FirstOrDefault(c => c.RecipeId == id);
          var img =recipeDTO.RecipeImage;
            if (img != null)
            {


                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe");

               
                var imageFilePath = Path.Combine(uploadFolder, recipeDTO.RecipeImage.FileName);

                if (recipeDTO.RecipeImage != null)
                {
                    using (var stream = new FileStream(imageFilePath, FileMode.Create))
                    {
                        recipeDTO.RecipeImage.CopyTo(stream); 
                    }
                }

            }
            
            if (recipe == null) return NotFound(); 

            recipe.RecipeName = recipeDTO.RecipeName ?? recipe.RecipeName;

            if (recipeDTO.RecipeImage != null)
            {
                recipe.RecipeImage = recipeDTO.RecipeImage.FileName ?? recipe.RecipeImage;
            }

            _db.Recipes.Update(recipe);
            _db.SaveChanges();

            return Ok(recipe);
        }


     

        [HttpDelete("Nutritiom/DeleteRecipe/{id}")]
        public IActionResult DeleteRecipe(int id)
        {

            if (id <= 0)
            {
                return BadRequest("Invalid Recipe");
            }
            var recipe = _db.Recipes.FirstOrDefault(p => p.RecipeId == id);
            if (recipe != null)
            {

                _db.Recipes.Remove(recipe);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound("No Recipe found");


        }

        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {

            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "ImageRecipe", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();
        }

    }
}
