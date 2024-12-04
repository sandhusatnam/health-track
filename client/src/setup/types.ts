export interface GenericProps {
  loggedInUser: AppUser;
}

export interface AppUser {
  id: string;
  email: string;
}

export interface UserProgress {
  type: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  percentage: number;
}

export interface UserProgressReport extends UserProgress {
  fill: string;
}

export interface Log {
  id?: string;
  userId: string;
  timestamp: Date;
  type: string;
  details: LogDetails;
}

export interface LogDetails {
  value?: number;
  calories?: number;
  duration?: number;
  steps?: number;
  distance?: number;
  waterIntake?: number;
  foodName?: string;
}

export interface Goal {
  id?: string;
  userId: string;
  timestamp: Date;
  type: string;
  target: number;
}

export interface FoodData {
  foods: {
    foodName: string;
    brandName: string;
    servingQty: number;
    servingUnit: string;
    servingWeightGrams: number;
    calories: number;
    totalFat: number;
    saturatedFat: number;
    cholesterol: number;
    sodium: number;
    totalCarbohydrate: number;
    dietaryFiber: number;
    sugars: number;
    protein: number;
    potassium: number;
  }[];
}
