import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import React from "react";

const users = [
  { id: 50, username: "zekix", name: "Clarke Pitts", email: "zekix@mailinator.com" },
  { id: 49, username: "huqybos", name: "Whoopi Sellers", email: "huqybos@mailinator.com" },
  { id: 48, username: "fubidat", name: "Ezekiel Guerrero", email: "fubidat@mailinator.com" },
  { id: 47, username: "manjula.jaswini@gmail.com_344", name: "Manjula Vinoth Kumar", email: "manjula.jaswini@gmail.com" },
  { id: 46, username: "Auditor2", name: "Auditor 2", email: "auditor2@dashboard.test" },
  { id: 45, username: "Auditor", name: "Auditor Name", email: "auditor@dashboard.test" },
  { id: 44, username: "testforuserrole", name: "test user role", email: "testforuserrole@test.test" },
  { id: 41, username: "userthree@dashboard.com_669", name: "User Three", email: "userthree@dashboard.com" },
  { id: 40, username: "nigava@mailinator.com931", name: "Alexandra Duran", email: "nigava@mailinator.com" },
  { id: 39, username: "usertwo", name: "User Two", email: "usertwo@dashboard.com" },
];

const Admins = () => {
  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Admins</h2>
      <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg p-4 mt-4">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <button className="text-blue-400 hover:text-blue-300">
                    <Pencil size={18} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-300">
                    <MoreHorizontal size={18} />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
