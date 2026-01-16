import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Cpu, Layers, Users, Award, Grid3X3,
  ChevronLeft, ChevronRight, Zap, Link2, UserCircle, UsersRound
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const getNavigation = (isManager: boolean) => [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, managerOnly: false },
  { name: 'Technologies', href: '/technologies', icon: Cpu, managerOnly: true },
  { name: 'Skills', href: '/skills', icon: Layers, managerOnly: true },
  { name: 'Profiles', href: '/profiles', icon: UserCircle, managerOnly: true },
  { name: 'Grades', href: '/grades', icon: Award, managerOnly: true },
  { name: 'Employees', href: '/employees', icon: UsersRound, managerOnly: true },
  { name: 'Skill Matrix', href: '/matrix', icon: Grid3X3, managerOnly: false },
  { name: 'Tech-Skill Map', href: '/mappings/tech-skills', icon: Link2, managerOnly: true },
  { name: 'Tech-Profile Map', href: '/mappings/tech-profiles', icon: Link2, managerOnly: true },
  { name: 'Profile-User Map', href: '/mappings/profile-users', icon: Users, managerOnly: true },
  { name: 'Employee Skills', href: '/mappings/employee-skills', icon: Award, managerOnly: true },
].filter(item => isManager || !item.managerOnly);

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isManager } = useAuth();
  const navigation = getNavigation(isManager);

  return (
    <div className={cn("flex flex-col h-screen bg-sidebar transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary">
            <Zap className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="text-lg font-semibold text-sidebar-foreground">KMM</span>}
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink key={item.name} to={item.href}
              className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}>
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-sidebar-primary")} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-2 border-t border-sidebar-border">
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
