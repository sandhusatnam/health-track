import { useState, FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { GenericProps } from "@/setup/types";

interface HeaderProps extends GenericProps {
  onLogout: () => void;
}

const Header: FC<HeaderProps> = ({ loggedInUser, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Track</h1>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="flex items-center space-x-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="h-5 w-5" />
                <span>{loggedInUser.email}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ zIndex: 9999 }}>
              <DropdownMenuItem onSelect={onLogout} className="cursor-pointer">
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
