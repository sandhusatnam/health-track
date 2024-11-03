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
import { useToast } from '@/hooks/use-toast'
import { FC } from 'react'

const ActivityLogging: FC = () => {
  const [activityType, setActivityType] = useState('')
  const [amount, setAmount] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Logged:', { activityType, amount })
    toast({
      title: 'Activity Logged',
      description: `You've logged ${amount} ${getUnit(activityType)} of ${activityType}.`,
      variant: 'success',
      duration: 1000
    })
    setAmount('')
  }

  const getUnit = (type: string) => {
    switch (type) {
      case 'meal':
        return 'calories'
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <div>
            <Label htmlFor="amount">Amount ({getUnit(activityType)})</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount ${getUnit(activityType)}`}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full"
              disabled={!activityType || !amount}
            >
              Log Activity
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ActivityLogging