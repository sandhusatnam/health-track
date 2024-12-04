import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FC } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FoodAPI } from "@/setup/urls";
import { FoodData, GenericProps, Log } from "@/setup/types";
import axios from "@/lib/axios";
import { logActivity } from "@/setup/api/log.api";
import LoggingHistory from "./LoggingHistory";
import { getUnit } from "@/setup/utils";

const ActivityLogging: FC<GenericProps> = ({ loggedInUser }) => {
  const [activityType, setActivityType] = useState("");
  const [value, setValue] = useState("");
  const [mealInputType, setMealInputType] = useState("calories");
  const [mealDescription, setMealDescription] = useState("");
  const [calories, setCalories] = useState("");
  const { toast } = useToast();
  const loggingHistoryRef = useRef<{ reloadLogs: () => void }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let log: Log = {
      userId: loggedInUser.id,
      timestamp: new Date(),
    } as Log;

    if (activityType === "meal") {
      if (mealInputType === "calories") {
        log = {
          ...log,
          type: "meal",
          details: { calories: parseFloat(calories) },
        };
      } else {
        try {
          const fetchedCalories = await fetchCalorieInfo(mealDescription);
          log = {
            ...log,
            type: "meal",
            details: { calories: fetchedCalories },
          };

          toast({
            title: "Calorie Information Retrieved",
            description: `Estimated calories: ${fetchedCalories}`,
            variant: "success",
            duration: 3000,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to retrieve calorie information",
            variant: "destructive",
            duration: 3000,
          });
        }
      }
    } else {
      log = {
        ...log,
        type: activityType,
        details: fetchDetails(activityType),
      };
    }

    const loggedActivity = await logActivity(log);

    if (!!loggedActivity && !!loggedActivity.id) {
      toast({
        title: "Activity Logged",
        description: `You've logged ${value} ${getUnit(loggedActivity.type)} of ${loggedActivity.type}.`,
        variant: "success",
        duration: 3000,
      });
      resetForm();

      loggingHistoryRef.current?.reloadLogs();
    } else {
      toast({
        title: "Activity Logged",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const fetchDetails = (type: string) => {
    switch (type) {
      case "water":
        return { waterIntake: parseFloat(value) };
      case "activity":
        return { duration: parseFloat(value) };
      case "sleep":
        return { duration: parseFloat(value) };
      default:
        return {};
    }
  };

  const resetForm = () => {
    setValue("");
    setActivityType("");
    setMealDescription("");
    setCalories("");
  };

  const fetchCalorieInfo = async (description: string): Promise<number> => {
    try {
      const { data } = await axios.get<FoodData>(
        `${FoodAPI.GET_CALORIE_INFO}${description}`,
      );

      if (
        !data ||
        !data.foods ||
        data.foods.length === 0 ||
        data.foods[0].calories == null
      ) {
        toast({
          title: "Error",
          description: "Calorie information not found",
          variant: "destructive",
          duration: 3000,
        });
      }

      return data.foods[0].calories;
    } catch (error) {
      toast({
        title: "Error",
        description: "Calorie information not found",
        variant: "destructive",
        duration: 3000,
      });
    }

    return 0;
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="activity-type">Activity Type</Label>
            <Select onValueChange={setActivityType} value={activityType}>
              <SelectTrigger id="activity-type">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">Meal</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="activity">Physical Activity</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {activityType === "meal" ? (
            <div className="space-y-4">
              <RadioGroup
                defaultValue="calories"
                onValueChange={setMealInputType}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="calories" id="calories" />
                  <Label htmlFor="calories">Enter Calories</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="description" id="description" />
                  <Label htmlFor="description">Describe Meal</Label>
                </div>
              </RadioGroup>
              {mealInputType === "calories" ? (
                <div>
                  <Label htmlFor="calories-input">Calories</Label>
                  <Input
                    id="calories-input"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Enter calories"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="meal-description">Meal Description</Label>
                  <Input
                    id="meal-description"
                    type="text"
                    value={mealDescription}
                    onChange={(e) => setMealDescription(e.target.value)}
                    placeholder="Describe what you ate"
                  />
                </div>
              )}
            </div>
          ) : !!activityType && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2">
                <Label htmlFor="amount">Amount ({getUnit(activityType)})</Label>
                <Input
                  id="amount"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Enter amount ${getUnit(activityType)}`}
                />
              </div>
              <div />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={
              !activityType ||
              (activityType === "meal"
                ? mealInputType === "calories"
                  ? !calories
                  : !mealDescription
                : !value)
            }
          >
            {activityType === "meal" && mealInputType === "description"
              ? "Get Calories & Log"
              : "Log Activity"}
          </Button>
        </div>
      </form>

      <br />
      <h2>Daily logs</h2>
      <LoggingHistory ref={loggingHistoryRef} loggedInUser={loggedInUser} />
    </div>
  );
};

export default ActivityLogging;
