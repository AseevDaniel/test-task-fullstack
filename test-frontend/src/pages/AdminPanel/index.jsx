import { useAuth } from "@/store/AuthProvider.jsx";
import { UserItem } from "@/components";
import "./admin-panel.scss";

export const AdminPanel = () => {
  const { user } = useAuth();

  return (
    <div className="adminPanel">
      <UserItem user={user} />
    </div>
  );
};
