import { Link } from "react-router-dom";
import { Pencil, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";

interface AdminEditButtonProps {
  to: string;
  label?: string;
  variant?: "icon" | "button";
  className?: string;
}

const AdminEditButton = ({ to, label = "Modifica", variant = "icon", className = "" }: AdminEditButtonProps) => {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) return null;

  if (variant === "icon") {
    return (
      <Button
        asChild
        size="icon"
        variant="outline"
        className={`h-8 w-8 bg-background/80 backdrop-blur border-primary/30 hover:bg-primary hover:text-primary-foreground ${className}`}
        title={label}
      >
        <Link to={to}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={`bg-background/80 backdrop-blur border-primary/30 hover:bg-primary hover:text-primary-foreground ${className}`}
    >
      <Link to={to}>
        <Settings className="h-4 w-4 mr-2" />
        {label}
      </Link>
    </Button>
  );
};

export default AdminEditButton;
