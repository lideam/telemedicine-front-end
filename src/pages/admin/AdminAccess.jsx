import { useState } from "react";
import AdminNav from "../../components/layout/AdminNav";
import { Search, Edit, Trash, PlusCircle } from "lucide-react";

const AdminAccess = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      email: "johndoe@example.com",
      role: "Doctor",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "Patient",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Dr. Sarah Lee",
      email: "sarahlee@example.com",
      role: "Doctor",
      status: "Active",
    },
    {
      id: 4,
      name: "Michael Johnson",
      email: "michaeljohnson@example.com",
      role: "Patient",
      status: "Active",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleStatusChange = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSaveUser = (user) => {
    if (isEditing) {
      // Edit an existing user
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add a new user
      setUsers([
        ...users,
        {
          id: Date.now(),
          name: user.name,
          email: user.email,
          role: user.role,
          status: "Active",
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Access</h1>
            <p className="text-sm text-gray-500">
              Manage users, roles, and permissions.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search Users"
              value={searchQuery}
              onChange={handleSearch}
              className="border p-2 rounded-lg w-64 text-sm"
            />
            <button
              onClick={handleAddUser}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <PlusCircle size={20} />
              <span>Add New User</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h4 className="text-xl font-semibold mb-4">Manage Users</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                    Role
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="border p-2 rounded-lg w-full text-sm"
                      >
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <button
                        onClick={() => handleStatusChange(user.id)}
                        className={`p-2 rounded-lg text-white min-w-[100px] ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700 space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Modal (Add/Edit User) */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h3 className="text-2xl font-semibold mb-6">
                {isEditing ? "Edit User" : "Add New User"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={editingUser ? editingUser.name : ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={editingUser ? editingUser.email : ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={editingUser ? editingUser.role : "Patient"}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Patient">Patient</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveUser(editingUser)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAccess;
