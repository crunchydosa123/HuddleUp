import { useState } from "react";

const Sidebar = () => {
  const [active, setActive] = useState("chat");

  const menuItems = [
    { name: "Chat" , id: "chat" },
    { name: "Huddles", id: "huddles" },
    { name: "Settings", id: "settings" },
  ];

  return (
    <div className=" text-white flex flex-col p-2">
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-1 px-2 py-1 rounded-md  ${
              active === item.id ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActive(item.id)}
          >
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
