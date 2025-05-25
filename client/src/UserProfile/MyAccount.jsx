import { NavLink, Outlet } from "react-router-dom";

const UserProfileLayout = () => {
  const navItems = [
    { name: "Profile Overview", path: "profile" },
    { name: "My Orders", path: "myoders" },
    { name: "Wishlist", path: "wishlist" },
    {name:"Manage Address", path:"address"},
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 mt-9">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl  mb-6 mt-5">My Account</h2>
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `py-2 px-3 rounded-md transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfileLayout;

