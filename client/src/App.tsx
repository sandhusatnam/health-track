import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import ActivityLogging from "./components/ActivityLogging";
import Dashboard from "./components/Dashboard";
import GoalTracker from "./components/GoalTracker";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import Reports from "./components/Reports";
import { AppUser } from "./setup/types";
import { createUser, fetchUserByEmail } from "./setup/api/user.api";

export default function HealthTrackApp() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<AppUser>({
    id: "",
    email: "",
  });

  const { toast } = useToast();

  const handleLogin = async (loggedInUser: AppUser) => {
    setIsLoggedIn(true);
    setLoggedInUser({
      id: loggedInUser!.id,
      email: loggedInUser!.email,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser({ id: "", email: "" });
    setActiveTab("dashboard");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "success",
      duration: 1000,
    });
  };

  if (!isLoggedIn) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
      <br />
      <main className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="log">Log Activity</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard loggedInUser={loggedInUser} />
          </TabsContent>
          <TabsContent value="log">
            <ActivityLogging loggedInUser={loggedInUser} />
          </TabsContent>
          <TabsContent value="goals">
            <GoalTracker loggedInUser={loggedInUser} />
          </TabsContent>
          <TabsContent value="reports">
            <Reports loggedInUser={loggedInUser} />
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
    </div>
  );
}
