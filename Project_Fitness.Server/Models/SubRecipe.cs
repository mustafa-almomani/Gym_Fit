using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class SubRecipe
{
    public int SubRecipeId { get; set; }

    public string SubRecipeName { get; set; } = null!;

    public string? PreparationTime { get; set; }

    public string? PreparationSteps { get; set; }

    public string? SubRecipeImage { get; set; }

    public string? Benefits { get; set; }

    public int RecipeId { get; set; }

    public virtual Recipe Recipe { get; set; } = null!;
}
