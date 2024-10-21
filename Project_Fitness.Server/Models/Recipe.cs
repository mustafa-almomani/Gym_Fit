using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class Recipe
{
    public int RecipeId { get; set; }

    public string RecipeName { get; set; } = null!;

    public string? RecipeImage { get; set; }

    public virtual ICollection<SubRecipe> SubRecipes { get; set; } = new List<SubRecipe>();
}
