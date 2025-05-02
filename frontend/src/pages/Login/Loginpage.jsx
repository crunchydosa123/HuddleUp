import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useUser(); // ✅ use the hook
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = {
      Username: username,
      Password: password,
    };

    try {
      const response = await fetch('https://jtikvcj940.execute-api.ap-south-1.amazonaws.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data);

        //localStorage.setItem('authToken', data.token);

        // ✅ Set user in context
        login(data);
        console.log('User logged in:', user);

        // ✅ Use navigation instead of full reload (if using React Router)
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to your account</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
