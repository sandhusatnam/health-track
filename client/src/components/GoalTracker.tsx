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
import { GenericProps, Goal } from "@/setup/types";
import { saveGoal } from "@/setup/api/log.api";
import { getUnit } from "@/setup/utils";
import GoalHistory from "./GoalHistory";

const GoalTracker: FC<GenericProps> = ({ loggedInUser }) => {
  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const goalHistoryRef = useRef<{ loadGoals: () => void }>(null);

  const { toast } = useToast();

  const addGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!!newGoalType && !!newGoalTarget) {
      const newGoal: Goal = {
        type: newGoalType,
        userId: loggedInUser.id,
        timestamp: new Date(),
        target: Number(newGoalTarget),
      };

      const res = await saveGoal(newGoal);
      
      if (!!res && !!res.userId) {
        setNewGoalType("");
        setNewGoalTarget("");
        toast({
          title: "Goal Added",
          description: `New ${newGoalType} goal set for ${newGoalTarget}.`,
          variant: "success",
          duration: 1000,
        });
        goalHistoryRef.current?.loadGoals();
      }
      else {
        toast({
          title: "Error",
          description: `Something went wrong while adding the goal.`,
          variant: "destructive",
          duration: 1000,
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addGoal} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="goal-type">Goal Type</Label>
            <Select onValueChange={setNewGoalType} value={newGoalType}>
              <SelectTrigger id="goal-type">
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meal">Calories</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="activity">Physical Activity</SelectItem>
                <SelectItem value="sleep">Sleep</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="goal-target">Target ({getUnit(newGoalType)})</Label>
            <Input
              id="goal-target"
              type="number"
              value={newGoalTarget}
              onChange={(e) => setNewGoalTarget(e.target.value)}
              placeholder={`Enter target ${getUnit(newGoalType)}`}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full"
              disabled={!newGoalType || !newGoalTarget}
            >
              Add Goal
            </Button>
          </div>
        </div>
      </form>

      <br />
      <h2>Goals</h2>
      <GoalHistory ref={goalHistoryRef} loggedInUser={loggedInUser} />
    </div>
  );
};

export default GoalTracker;
