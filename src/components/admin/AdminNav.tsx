import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, FileText, MessageSquare, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminNavProps {
  title: string;
  actions?: React.ReactNode;
}

const AdminNav = ({ title, actions }: AdminNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/blogs", label: "Blogs", icon: FileText },
    { to: "/admin/feedback", label: "Feedback", icon: MessageSquare },
    { to: "/admin/contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl md:text-3xl tracking-wider uppercase">
          {title}
        </h1>
        <div className="flex flex-wrap gap-2 items-center">
          {actions}
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <nav className="flex flex-wrap gap-1 border-b border-border">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminNav;
