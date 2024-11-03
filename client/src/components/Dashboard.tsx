import React, { FC } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Activity, Droplet, Utensils, Moon } from 'lucide-react'

const Dashboard: FC = () => {
  // Mock data - in a real app, this would come from an API or state management
  const dailyStats = {
    calories: { consumed: 1500, goal: 2000 },
    water: { consumed: 1.5, goal: 2.5 },
    activity: { done: 45, goal: 60 },
    sleep: { done: 7, goal: 8 },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Calories"
        icon={<Utensils className="h-4 w-4" />}
        current={dailyStats.calories.consumed}
        goal={dailyStats.calories.goal}
        unit="kcal"
      />
      <DashboardCard
        title="Water"
        icon={<Droplet className="h-4 w-4" />}
        current={dailyStats.water.consumed}
        goal={dailyStats.water.goal}
        unit="L"
      />
      <DashboardCard
        title="Activity"
        icon={<Activity className="h-4 w-4" />}
        current={dailyStats.activity.done}
        goal={dailyStats.activity.goal}
        unit="min"
      />
      <DashboardCard
        title="Sleep"
        icon={<Moon className="h-4 w-4" />}
        current={dailyStats.sleep.done}
        goal={dailyStats.sleep.goal}
        unit="hrs"
      />
    </div>
  )
}

interface DashboardCardProps {
  title: string
  icon: React.ReactNode
  current: number
  goal: number
  unit: string
}

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  icon,
  current,
  goal,
  unit,
}) => {
  const progress = (current / goal) * 100

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {current} {unit}
        </div>
        <Progress value={progress} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {progress.toFixed(0)}% of daily goal
        </p>
      </CardContent>
    </Card>
  )
}

export default Dashboard
