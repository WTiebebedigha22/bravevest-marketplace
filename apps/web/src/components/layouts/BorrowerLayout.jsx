import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@bravevest/ui/components';
import { useAuth } from '@/features/auth/context/AuthContext';
import { 
  FileText, 
  PlusCircle, 
  CreditCard,
  LogOut 
} from 'lucide-react';

const navItems = [
  { to: '/borrower/apply', icon: PlusCircle, label: 'Apply for Loan' },
  { to: '/borrower/applications', icon: FileText, label: 'Applications' },
  { to: '/borrower/repayments', icon: CreditCard, label: 'Repayments' },
];

export function BorrowerLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-brave-light-gray/20">
      <aside className="w-64 border-r border-brave-light-gray bg-white p-4 flex flex-col">
        <Link to="/borrower/dashboard" className="text-xl font-serif font-light mb-8">
          BraveVest
        </Link>
        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                location.pathname === to
                  ? 'bg-brave-lime/20 text-brave-black font-medium'
                  : 'text-brave-gray hover:bg-brave-light-gray/30'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <Button variant="ghost" className="justify-start text-brave-gray" onClick={logout}>
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}