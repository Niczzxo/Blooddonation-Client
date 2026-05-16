import { NavLink } from 'react-router';

const MyLink = ({ to, children }) => {
    return (
        <NavLink 
            to={to} 
            className={({ isActive }) => 
                `relative px-4 py-2 text-sm font-black uppercase tracking-widest transition-all duration-300 group ${
                    isActive 
                        ? "text-rose-600 dark:text-rose-500" 
                        : "text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-500"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span className="relative z-10">{children}</span>
                    {isActive && (
                        <div className="absolute inset-x-2 -bottom-1 h-1 bg-rose-600 dark:bg-rose-500 rounded-full shadow-lg shadow-rose-200 dark:shadow-none" />
                    )}
                </>
            )}
        </NavLink>
    );
};

export default MyLink;