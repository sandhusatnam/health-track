import React, { FC, useEffect, useState } from "react";

import { Activity, Droplet, Utensils, Moon } from "lucide-react";
import { GenericProps, UserProgress } from "@/setup/types";
import { fetchUserProgress } from "@/setup/api/log.api";
import Loading from "./ui/loading";
import { useToast } from "@/hooks/use-toast";
import DashboardCard from "./ui/DashboardCard";

const Dashboard: FC<GenericProps> = ({ loggedInUser }) => {
  const [dailyStats, setDailyStats] = useState<UserProgress[] | null>(
    [] as UserProgress[],
  );
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    fetchUserProgress(loggedInUser.id)
      .then((data) => {
        setDailyStats(data);
      })
      .catch((error) => {
        setDailyStats([]);

        toast({
          title: "Error",
          description:
            "Something went wrong while fetching user progress, please try again later",
          variant: "destructive",
          duration: 3000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [loggedInUser.id]);

  if (dailyStats == null || dailyStats.length === 0) {
    return <p className="text-center w-full">No data available</p>;
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {dailyStats.map(
        ({ type, name: label, value, target, unit }) => (
          <DashboardCard
            key={type}
            title={label}
            icon={
              type === "meal" ? (
                <Utensils className="h-4 w-4" />
              ) : type === "water" ? (
                <Droplet className="h-4 w-4" />
              ) : type === "activity" ? (
                <Activity className="h-4 w-4" />
              ) : type === "sleep" ? (
                <Moon className="h-4 w-4" />
              ) : null
            }
            current={value}
            goal={target}
            unit={unit}
          />
        ))}
    </div>
  );
};

export default Dashboard;
