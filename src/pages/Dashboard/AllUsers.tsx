
import { toast } from 'sonner';
import { useGetAllUserDataQuery } from '../../redux/features/auth/authApi';
import {
    useChangeRoleMutation,
} from "../../redux/features/auth/authApi";// adjust path if needed


import { IUser } from '../../redux/types/user';

const AllUsers = () => {
    const { data: usersData, refetch: refetchUser } = useGetAllUserDataQuery({});
    const [changeRole] = useChangeRoleMutation();

    const handleChangeRole = async (id: string, role: 'admin' | 'user') => {
        try {
            await changeRole({ id, role }).unwrap();

            toast.success("User role updated");
            refetchUser()
        } catch (err) {
            console.log(err);
            toast.error("Failed to update role");
        }
    };

    return (
        <div className="bg-[#1E1E2F] p-4 rounded-lg overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-white">All Users</h2>
            <table className="w-full table-auto text-left text-sm">
                <thead className="bg-[#2A2A3F] text-gray-300">
                    <tr>
                        <th className="p-2">Image</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-200">
                    {usersData?.data?.map((user: IUser) => (
                        <tr key={user._id} className="border-b border-gray-700">
                            <td className="p-2">
                                <img
                                    src={user.imageUrl }
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2 capitalize">{user.role}</td>
                            <td className="p-2">{user.status}</td>
                            <td className="p-2 flex gap-2">
                                <button
                                    onClick={() =>
                                        handleChangeRole(
                                            user._id,
                                            user.role === "admin" ? "user" : "admin"
                                        )
                                    }
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Make {user.role === "admin" ? "User" : "Admin"}
                                </button>
                                <button >
                                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;
