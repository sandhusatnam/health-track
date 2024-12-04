export const getUnit = (type: string) => {
    switch (type) {
      case "meal":
        return "kcal";
      case "water":
        return "L";
      case "activity":
        return "min";
      case "sleep":
        return "hrs";
      default:
        return "";
    }
};

export const getFillColor = (type: string) => {
  switch (type) {
    case "meal":
      return "#ffc658";
    case "water":
      return "#83a6ed";
    case "activity":
      return "#d0ed57";
    case "sleep":
      return "#82ca9d";
    default:
      return "";
  }
};