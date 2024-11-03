import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { FC } from 'react'

type Goal = {
  id: number
  type: string
  target: number
  current: number
}

const GoalTracker: FC = () => {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoalType, setNewGoalType] = useState('')
  const [newGoalTarget, setNewGoalTarget] = useState('')

  const { toast } = useToast()

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGoalType && newGoalTarget) {
      const newGoal: Goal = {
        id: Date.now(),
        type: newGoalType,
        target: Number(newGoalTarget),
        current: 0,
      }
      setGoals([...goals, newGoal])
      setNewGoalType('')
      setNewGoalTarget('')
      toast({
        title: 'Goal Added',
        description: `New ${newGoalType} goal set for ${newGoalTarget}.`,
        variant: 'success',
        duration: 1000
      })
    }
  }

  const updateGoalProgress = (id: number, progress: number) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? { ...goal, current: Math.min(progress, goal.target) }
          : goal
      )
    )
  }

  const getUnit = (type: string) => {
    switch (type) {
      case 'calories':
        return 'kcal'
      case 'water':
        return 'L'
      case 'activity':
        return 'min'
      case 'sleep':
        return 'hrs'
      default:
        return ''
    }
  }

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
                <SelectItem value="calories">Calories</SelectItem>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>
                {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span>
                    {goal.current} / {goal.target} {getUnit(goal.type)}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} />
                <Input
                  type="number"
                  value={goal.current}
                  onChange={(e) =>
                    updateGoalProgress(goal.id, Number(e.target.value))
                  }
                  placeholder="Update progress"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default GoalTracker
