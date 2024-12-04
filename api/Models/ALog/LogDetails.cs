#nullable enable

using System;
using System.Collections.Generic;

namespace api.Models.Log
{
    public class LogDetails
    {
        public double value { get; set; }
        public double calories { get; set; }
        public double duration { get; set; }
        public int steps { get; set; }
        public double distance { get; set; }
        public double waterIntake { get; set; }
        public string? foodName { get; set; }
    }
}