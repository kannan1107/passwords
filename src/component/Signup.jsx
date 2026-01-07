import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useRegisterMutation } from '../features/ApplicationApi';




function Signup() {
  const {isAuthenticated} = useSelector((state) => state.auth);
  const defaultState = {
    name: '',
    email: '',
    password: ''
  };
  const [data, setData] = useState(defaultState);
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const handleChange = (event) => {
    setData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    registerMutation(data)
      .unwrap()
      .then((res) => {
        setData(defaultState);
        alert('User created successfully!');
      })
      .catch((error) => {
        console.error('Failed to create user:', error);
        if (error.status === 404 || error.originalStatus === 404) {
          alert('Server endpoint not found. Please check if the backend server is running and has the /users endpoint.');
        } else {
          alert('Failed to create user. Please try again.');
        }
      });
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-900">Welcome to the Signup Page</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="username"
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
              autoComplete="new-password"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup