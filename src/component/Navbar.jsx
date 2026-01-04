import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('Auth state:', { isAuthenticated, user });
 
  

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Navbar</h1>
        <ul className="flex space-x-4 items-center">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          {!isAuthenticated ? (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
            </>
          ) : (
            <>
              <li className="flex flex-col text-sm">
                <span>Welcome, {user?.name || 'User'}</span>
                <span className="text-xs opacity-75">{user?.email}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:underline">
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;