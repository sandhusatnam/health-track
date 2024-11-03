import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState, FC } from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type ReportType = 'calories' | 'water' | 'activity' | 'sleep'

const mockData: Record<ReportType, { date: string; value: number }[]> = {
  calories: [
    { date: '2023-06-01', value: 1800 },
    { date: '2023-06-02', value: 2100 },
    { date: '2023-06-03', value: 1950 },
    { date: '2023-06-04', value: 2200 },
    { date: '2023-06-05', value: 1850 },
    { date: '2023-06-06', value: 2000 },
    { date: '2023-06-07', value: 2150 },
  ],
  water: [
    { date: '2023-06-01', value: 1.5 },
    { date: '2023-06-02', value: 2.0 },
    { date: '2023-06-03', value: 1.8 },
    { date: '2023-06-04', value: 2.2 },
    { date: '2023-06-05', value: 1.7 },
    { date: '2023-06-06', value: 2.1 },
    { date: '2023-06-07', value: 2.3 },
  ],
  activity: [
    { date: '2023-06-01', value: 30 },
    { date: '2023-06-02', value: 45 },
    { date: '2023-06-03', value: 60 },
    { date: '2023-06-04', value: 30 },
    { date: '2023-06-05', value: 45 },
    { date: '2023-06-06', value: 60 },
    { date: '2023-06-07', value: 75 },
  ],
  sleep: [
    { date: '2023-06-01', value: 7 },
    { date: '2023-06-02', value: 6.5 },
    { date: '2023-06-03', value: 8 },
    { date: '2023-06-04', value: 7.5 },
    { date: '2023-06-05', value: 7 },
    { date: '2023-06-06', value: 6 },
    { date: '2023-06-07', value: 7.5 },
  ],
}

const Reports: FC = () => {
  const [reportType, setReportType] = useState('calories')

  return (
    <div className="space-y-4">
      <Select onValueChange={setReportType} defaultValue={reportType}>
        <SelectTrigger>
          <SelectValue placeholder="Select report type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="calories">Calories</SelectItem>
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
            <LineChart data={mockData[reportType as ReportType]}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reports
