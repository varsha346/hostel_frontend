import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Home, FileText, MessageSquare, Calendar, Bed, Users, CheckSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface LayoutProps {
  children: ReactNode;
  title: string;
  userType?: "student" | "warden";
}

export function Layout({ children, title, userType }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const studentMenuItems = [
    { label: "Dashboard", path: "/student/dashboard", icon: Home },
    { label: "Leave Application", path: "/student/leave", icon: Calendar },
    { label: "Complaints", path: "/student/complaints", icon: MessageSquare },
    { label: "Room Booking", path: "/student/booking", icon: Bed },
    { label: "Room Information", path: "/student/rooms", icon: FileText },
  ];

  const wardenMenuItems = [
    { label: "Dashboard", path: "/warden/dashboard", icon: Home },
    { label: "Booking Requests", path: "/warden/bookings", icon: CheckSquare },
    { label: "Leave Requests", path: "/warden/leaves", icon: Calendar },
    { label: "Complaints", path: "/warden/complaints", icon: MessageSquare },
    { label: "Room Management", path: "/warden/rooms", icon: Users },
  ];

  const menuItems = userType === "student" ? studentMenuItems : wardenMenuItems;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
            {userType && (
              <p className="text-muted-foreground capitalize">
                {userType} Portal
              </p>
            )}
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        
        {userType && (
          <div className="container mx-auto px-4 pb-4">
            <Menubar>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <MenubarMenu key={item.path}>
                    <MenubarTrigger 
                      className={`cursor-pointer ${isActive ? 'bg-accent text-accent-foreground' : ''}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </MenubarTrigger>
                  </MenubarMenu>
                );
              })}
            </Menubar>
          </div>
        )}
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}