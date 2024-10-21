using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class Subscription
{
    public int SubscriptionId { get; set; }

    public int UserId { get; set; }

    public int? GymId { get; set; }

    public int? FitnessClassesId { get; set; }

    public DateOnly SubscriptionStartDate { get; set; }

    public DateOnly SubscriptionEndDate { get; set; }

    public decimal Price { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual FitnessClass? FitnessClasses { get; set; }

    public virtual Gym? Gym { get; set; }

    public virtual User User { get; set; } = null!;
}
