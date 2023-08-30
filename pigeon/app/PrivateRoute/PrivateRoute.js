import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';

const PrivateRoute = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/sign-in'); // Redirect to sign-in if not authenticated
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // Or render a loading indicator
    }

    return <WrappedComponent {...props} />;
  };
};

export default PrivateRoute;
