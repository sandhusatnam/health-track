import React, { FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  current: number;
  goal: number;
  unit: string;
}

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  icon,
  current,
  goal,
  unit,
}) => {
  const progress = (current / goal) * 100;

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
  );
};

export default DashboardCard;
