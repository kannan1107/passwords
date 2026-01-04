import { useForgetPasswordMutation } from "../features/ApplicationApi";


function Restartpassword() {
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  // password restart
  const handleResetPassword = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      await forgetPassword({ email }).unwrap();
      alert("Password reset email sent successfully");
    } catch (error) {
      console.error('Error resetting password:', error);
      alert("Invalid email or error resetting password");
    }
  };






  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">  
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <form onSubmit={handleResetPassword} className="space-y-6">
        <div>   
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    autoComplete="email"
                    required    
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
         
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
            >
                {isLoading ? "Sending..." : "Send Reset Email"}
            </button>
        </form>
      </div>
    </div>
  );
}

export default Restartpassword;