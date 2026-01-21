
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart2, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const navItems = [
    { icon: <Home size={22} />, label: '오늘', path: '/today' },
    { icon: <Calendar size={22} />, label: '주간', path: '/weekly' },
    { icon: <BarChart2 size={22} />, label: '통계', path: '/stats' },
    { icon: <Settings size={22} />, label: '설정', path: '/settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-white dark:bg-dark-gray shadow-xl relative overflow-hidden">
      {/* Scrollable Content Area */}
      <div className={`flex-1 overflow-y-auto no-scrollbar ${!isLandingPage ? 'pb-24' : ''}`}>
        {children}
      </div>

      {/* Bottom Navigation - Hidden on Landing Page */}
      {!isLandingPage && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-20 bg-white/80 dark:bg-navy-card/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex items-center justify-around px-6 z-40">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === item.path 
                  ? 'text-vibrant-orange scale-110 font-bold' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};
