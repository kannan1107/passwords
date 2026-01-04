import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useLoginMutation } from '../features/ApplicationApi';
import { createUser } from '../store/authSlice';


function Login() {

const defaultState = {
  email: "",
  password: "",
 }

const [data, setData] = useState (defaultState);
const [remember, setRemember] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const navigate = useNavigate();
const user = useSelector((state) => state.auth.user);

useEffect(() => {
  if(user) {
    setData({...defaultState})
    navigate("/");
  }
}, [user, navigate]);

const [Login, { isLoading} ]= useLoginMutation();
const dispatch = useDispatch();
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const res = await Login(data).unwrap();
    console.log('Login response:', res);
    console.log('Response type:', typeof res);
    console.log('Response keys:', Object.keys(res || {}));
    
    if (res) {
      dispatch(createUser(res));
      setData({ email: "", password: "" });
      setError('');
      alert('Login successful! Welcome back!');
    } else {
      throw new Error('No response from server');
    }
  } catch (error) {
    console.log('Login error:', error);
    alert('Invalid email or password');
    setError('Invalid email or password');
  }
};
const handleChange = (event) => {
  setData(state => ({...state, [event.target.name]: event.target.value}));
  console.log(data);
  console.log(event.target.name);
  console.log(event.target.value);
  console.log(event);
  console.log(event.target);

};
const handleRemember = () => {
  setRemember(!remember);
};
const handleForgotPassword = () => {  
  navigate("/forgot-password");
  
};









  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">Welcome to the Login Page</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={data.email}
              onChange={handleChange}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={data.password}
              onChange={handleChange}
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                checked={remember}
                onChange={handleRemember}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>
            <div className="text-sm">
              <a href="/restartpassword" className="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;