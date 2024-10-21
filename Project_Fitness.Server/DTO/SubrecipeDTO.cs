namespace Project_Fitness.Server.DTO
{
    public class SubrecipeDTO
    {
        //public int SubRecipeId { get; set; }
        public int? RecipeId { get; set; }
        public string? SubRecipeName { get; set; } 

        public string? PreparationTime { get; set; }

        public string? PreparationSteps { get; set; }

        public IFormFile? SubRecipeImage { get; set; }

        public string? Benefits { get; set; }
    }
}
