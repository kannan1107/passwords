import { useFetchAllUsersQuery } from '../features/ApplicationApi';

function Home() {
  const { data, isLoading, error } = useFetchAllUsersQuery();
  
  console.log('API Response:', data);
  
  // Handle different response formats
  const users = Array.isArray(data) ? data : data?.users || data?.data || [];

  if (isLoading) return <div className="text-center p-4">Loading users...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error loading users</div>;

  return (
    <div className="home-container p-6">
      <h1 className="home-heading text-center text-3xl font-bold mb-6">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users && users.length > 0 ? users.map((user) => (
          <div key={user.id || user._id} className="bg-white p-4 rounded-lg shadow-md border">
            <h3 className="font-semibold text-lg">{user.name || 'No Name'}</h3>
            <p className="text-gray-600">{user.email}</p>
            {user.phone && <p className="text-gray-500 text-sm">{user.phone}</p>}
          </div>
        )) : (
          <p className="text-center text-gray-500 col-span-full">No users found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
