using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class FitnessClass
{
    public int FitnessClassesId { get; set; }

    public string FitnessClassesName { get; set; } = null!;

    public string? FitnessClassesImage { get; set; }

    public string? FitnessClassesDescription { get; set; }

    public decimal? Price { get; set; }

    public string? FitnessClassesLocation { get; set; }

    public string? Days { get; set; }

    public TimeOnly? StartTime { get; set; }

    public TimeOnly? EndTime { get; set; }

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
}
