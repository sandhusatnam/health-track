import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createUser, fetchUserByEmail } from "@/setup/api/user.api";
import { AppUser } from "@/setup/types";

interface LoginProps {
  onLogin: (loggedInUser: AppUser) => void;
}

const LoginPage: FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!!email && !!password) {
      let user = await fetchUserByEmail(email);
      if (user === null || user.email === "") {
        user = await createUser(email);
      }

      if (!!user && !!user.email) {
        onLogin(user);
      } else {
        toast({
          title: "Error",
          description: "Failed to login, please try again later.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
        variant: "destructive",
        duration: 2000,
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex items-center justify-center w-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Welcome to Health Track
            </CardTitle>
            <CardDescription className="text-center">
              Login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
                <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                >
                {isSubmitting ? "Loading..." : "Login"}
                </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground text-center">
              For beta access, contact{" "}
              <a
                href="mailto:info@healthtrack.com"
                className="text-blue-500 underline"
              >
                info@healthtrack.com
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
