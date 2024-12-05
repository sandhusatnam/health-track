using Newtonsoft.Json;

namespace api.Models.Log
{
    public class Food
    {
        [JsonProperty("food_name")]
        public string FoodName { get; set; }

        [JsonProperty("brand_name")]
        public string BrandName { get; set; }

        [JsonProperty("serving_qty")]
        public int ServingQty { get; set; }

        [JsonProperty("serving_unit")]
        public string ServingUnit { get; set; }

        [JsonProperty("serving_weight_grams")]
        public double ServingWeightGrams { get; set; }

        [JsonProperty("nf_calories")]
        public double Calories { get; set; }

        [JsonProperty("nf_total_fat")]
        public double TotalFat { get; set; }

        [JsonProperty("nf_saturated_fat")]
        public double SaturatedFat { get; set; }

        [JsonProperty("nf_cholesterol")]
        public double Cholesterol { get; set; }

        [JsonProperty("nf_sodium")]
        public double Sodium { get; set; }

        [JsonProperty("nf_total_carbohydrate")]
        public double TotalCarbohydrate { get; set; }

        [JsonProperty("nf_dietary_fiber")]
        public double DietaryFiber { get; set; }

        [JsonProperty("nf_sugars")]
        public double Sugars { get; set; }

        [JsonProperty("nf_protein")]
        public double Protein { get; set; }

        [JsonProperty("nf_potassium")]
        public double Potassium { get; set; }

        //all these can be utilized in future if needed
        //public List<FullNutrient> FullNutrients { get; set; }
        //public string NixBrandName { get; set; }
        //public string NixBrandId { get; set; }
        //public string NixItemName { get; set; }
        //public string NixItemId { get; set; }
        //public string Upc { get; set; }
        //public DateTime ConsumedAt { get; set; }
        //public Metadata Metadata { get; set; }
        //public int Source { get; set; }
        //public int NdbNo { get; set; }
        //public Tags Tags { get; set; }
        //public List<AltMeasure> AltMeasures { get; set; }
        //public double? Lat { get; set; }
        //public double? Lng { get; set; }
        //public int MealType { get; set; }
        //public Photo Photo { get; set; }
        //public object SubRecipe { get; set; }
        //public object ClassCode { get; set; }
        //public object BrickCode { get; set; }
        //public object TagId { get; set; }
    }

    public class FullNutrient
    {
        public int AttrId { get; set; }
        public double Value { get; set; }
    }

    public class Metadata
    {
        public bool IsRawFood { get; set; }
    }

    public class Tags
    {
        public string Item { get; set; }
        public object Measure { get; set; }
        public string Quantity { get; set; }
        public int FoodGroup { get; set; }
        public int TagId { get; set; }
    }

    public class AltMeasure
    {
        public double ServingWeight { get; set; }
        public string Measure { get; set; }
        public int Seq { get; set; }
        public int Qty { get; set; }
    }

    public class Photo
    {
        public string Thumb { get; set; }
        public string Highres { get; set; }
        public bool IsUserUploaded { get; set; }
    }
}
