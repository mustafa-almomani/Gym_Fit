namespace Project_Fitness.Server.DTO
{
    public class RecipeDTO
    {
        public string RecipeName { get; set; } = null!;

        public IFormFile? RecipeImage { get; set; }
    }
}
