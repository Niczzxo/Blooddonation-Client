import { NavLink } from 'react-router';

const MyLink = ({ to, children }) => {
    return (
        <NavLink 
            to={to} 
            className={({ isActive }) => 
                `relative px-4 py-2 text-sm font-black uppercase tracking-widest transition-all duration-300 group ${
                    isActive 
                        ? "text-red-600 dark:text-red-500" 
                        : "text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span className="relative z-10">{children}</span>
                    {isActive && (
                        <div className="absolute inset-x-2 -bottom-1 h-1 bg-red-600 dark:bg-red-500 rounded-full shadow-lg shadow-red-200 dark:shadow-none" />
                    )}
                </>
            )}
        </NavLink>
    );
};

export default MyLink;