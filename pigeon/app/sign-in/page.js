"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAuth } from '../Contexts/AuthContext';
const baseUrl='http://127.0.0.1:8000/api'

                  
const SignIn = () => {
  const { login } = useAuth();
  const router = useRouter(); // Initialize useRouter

  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState({
    email:'',
    password:'',
    role:'adminstaff'
  });
  


  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };


  const handleRedirection = (userRole) => {
    switch (userRole) {
      case 'adminstaff':
        router.push('/admin'); // Redirect to admin dashboard
        break;
      case 'teacher':
        router.push('/teacher'); // Redirect to teacher dashboard
        break;
      case 'parent':
        router.push('/parents'); // Redirect to parent dashboard
        break;
      case 'student':
        router.push('/student'); // Redirect to student dashboard
        break;
      default:
        router.push('/'); // Redirect to some default page if role is not recognized
    }
  };




  
  const submitForm = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append('email', loginData.email);
    formData.append('password', loginData.password);
    
    const loginEndpoint = `/${loginData.role}-login`;
    
    axios
    .post(baseUrl + loginEndpoint, formData)
    .then((res) => {
      console.log('API Response:', res); 
      if (res.data.bool === true) {
      
  
        localStorage.setItem('loginstatus', true);
        localStorage.setItem('jwtToken', res.data.access_token); // Use res.data.access_token
        console.log('JWT Token:', res.data.access_token);
        handleRedirection(loginData.role); // Call the redirection function with user role
        login(loginData.role); // Call the login function from context
        
       // window.location.href = '/';
      }
      else {
        setErrorMessage('Invalid Login Credentials');
      }
    })
    .catch((error) => {
      console.log('API Error:', error); // Log the error
      setErrorMessage('Invalid Login Credentials');
    });
  };
  



// Check if the user is already logged in and redirect
const loginstatus = localStorage.getItem('loginstatus');
if (loginstatus === 'true') {
 // const userRole = localStorage.getItem(loginData.role);
  handleRedirection(loginData.role); // Redirect to the appropriate dashboard
}



  return (
    <div className='flex justify-center items-center'>
      <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sign up
        </h2>
        <form className="mt-8 space-y-6" >
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>


          <select
              name="role"
              id="role"
              value={loginData.role}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="adminstaff">Admin Staff</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          
            {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}



          
          <button onClick={submitForm} type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Already have an account? <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Sign In</a>
          </div>
        </form>
      </div>

     
    </div>
  );
};

export default SignIn;
