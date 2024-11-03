import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from './components/Dashboard'
import ActivityLogging from './components/ActivityLogging'
import Header from './components/Header'
import Reports from './components/Reports'
import { Toaster } from "@/components/ui/toaster"
import GoalTracker from './components/GoalTracker'
import LoginPage from './components/Login'
import { useToast } from '@/hooks/use-toast'

export default function HealthTrackApp() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')
  
  const { toast } = useToast()

  const handleLogin = (username: string) => {
    setIsLoggedIn(true)
    setLoggedInUser(username);
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoggedInUser('');
    setActiveTab('dashboard')
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "success",
      duration: 1000
    })
  }

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
      <br/>
      <main className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="log">Log Activity</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="log">
            <ActivityLogging />
          </TabsContent>
          <TabsContent value="goals">
            <GoalTracker />
          </TabsContent>
          <TabsContent value="reports">
            <Reports />
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
    </div>
  )
}