using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class Tip
{
    public int TipsId { get; set; }

    public string TipsName { get; set; } = null!;

    public string TipsDescription { get; set; } = null!;

    public string? TipsImage { get; set; }
}
