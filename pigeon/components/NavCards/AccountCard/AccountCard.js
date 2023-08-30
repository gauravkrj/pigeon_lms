'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AccountCard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on component mount
    const storedToken = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!storedToken); // Convert token presence to boolean
  }, []);

  
  const handleLogout = () => {
    // Clear stored values from localStorage
    localStorage.removeItem('loginstatus');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole'); // Clear userRole as well
    setIsLoggedIn(false);
    // Redirect to signin page
    router.push('/sign-in'); // Use router.push to navigate
  };

  return (
    <div className="bg-purple-200 p-4 rounded shadow">
      <p className="text-black font-semibold px-2 py-1 rounded mt-2">Your Account</p>
      {isLoggedIn ? (
        <button className="bg-purple-600 text-white font-semibold px-2 py-1 rounded mt-2" onClick={handleLogout}>
          Sign Out
        </button>
      ) : (
        <Link href="/sign-in">
          <button className="bg-purple-600 text-white font-semibold px-2 py-1 rounded mt-2">
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
};

export default AccountCard;
