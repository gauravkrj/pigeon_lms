'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/mobilenav.module.css';
import { Playfair_Display } from 'next/font/google';
import { Staatliches } from 'next/font/google';
import { Ubuntu } from 'next/font/google';
import { BsFillHouseFill, BsFillChatRightFill, BsFillClipboardPlusFill } from 'react-icons/bs';
import Image from 'next/image';
import jwt_decode from 'jwt-decode'; // Import jwt_decode
import { useRouter } from 'next/navigation'; // Import useRouter
import LOGO from '../../public/logogif.gif';
import { useAuth } from '@/app/Contexts/AuthContext';

const playfairDisplay = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const staatliches = Staatliches({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const ubuntu = Ubuntu({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});



const SideNav = () => {
  
  const { userRole } = useAuth();
  // const router = useRouter(); // Initialize useRouter

  // const [role, setRole] = useState('');
  // const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('jwtToken');
  //   if (storedToken) {
  //     const decodedToken = jwt_decode(storedToken);
  //     setRole(decodedToken.role);
  //     setIsUserSignedIn(true);
  //   }
  // }, []);

  




  


  const getPortalUrl = () => {
    if (userRole === 'teacher') {
      return '/teacher';
    } else if (userRole === 'adminstaff') {
      return '/admin';
    } else if (userRole === 'student') {
      return '/student';
    } else if (userRole === 'parent') {
      return '/parents';
    } else {
      return '/';
    }
  };

  const portalUrl = getPortalUrl();

  return (
  
    <div className={`  ${styles.background_color} z-1 absolute h-full w-40 flex flex-col`}>
      <div className=" flex flex-col justify-center items-center mt-6">
        <Link href="/">
          <Image
            src={LOGO}
            alt="logo"
            width={80}
            height={50}
            className="scale-x-[-1]  rounded-full"
          
            />
          <h2 className={`cursor-pointer text-2xl ${staatliches.className}`}>
            PIGEON LMS
          </h2>
        </Link>
      </div>
      {userRole && (
        <div className="flex flex-col mt-8">
          <ul className={`flex flex-col gap-4 ${ubuntu.className} `}>
            <div className="flex items-center ml-3 gap-2">
              <BsFillHouseFill />
              <Link href={portalUrl} className={`cursor-pointer`}>
                Dashboard
              </Link>
            </div>
            <div className="flex items-center ml-3 gap-2">
              <BsFillChatRightFill />
              <Link href="/student-chat" className={`cursor-pointer`}>
                Chat
              </Link>
            </div>
            <div className="flex items-center ml-3 gap-2">
              <BsFillClipboardPlusFill />
              <Link href="/create-notification" className={`cursor-pointer`}>
                Notify
              </Link>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideNav;



