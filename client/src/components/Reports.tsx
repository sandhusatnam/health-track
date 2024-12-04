import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fetchUserProgress } from "@/setup/api/log.api";
import { GenericProps, UserProgress, UserProgressReport } from "@/setup/types";
import { FC, useEffect, useMemo, useState } from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer
} from "recharts";
import Loading from "./ui/loading";
import { getFillColor } from "@/setup/utils";

const Reports: FC<GenericProps> = ({ loggedInUser }) => {
  const [reportType, setReportType] = useState("meal");
  const [dailyStats, setDailyStats] = useState<UserProgress[]>([] as UserProgress[]);

  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    fetchUserProgress(loggedInUser.id)
      .then((data) => {
        setDailyStats(data!);
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


  const chartData = useMemo(() => 
    dailyStats
      .filter(item => item.type.toLowerCase() === reportType.toLowerCase())
      .map(item => ({ ...item, fill: getFillColor(reportType) }))
  , [reportType, dailyStats]);

  if (dailyStats == null || dailyStats.length === 0) {
    return <p className="text-center w-full">No data available</p>;
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-4">
      <Select onValueChange={setReportType} defaultValue={reportType}>
        <SelectTrigger>
          <SelectValue placeholder="Select report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="meal">Calories</SelectItem>
          <SelectItem value="water">Water</SelectItem>
          <SelectItem value="activity">Physical Activity</SelectItem>
          <SelectItem value="sleep">Sleep</SelectItem>
        </SelectContent>
      </Select>

      <Card>
        <CardHeader>
          <CardTitle>
            {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              width={730}
              height={500}
              innerRadius="10%"
              outerRadius="80%"
              data={chartData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, chartData?.[0]?.target]} />
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                dataKey="value"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
