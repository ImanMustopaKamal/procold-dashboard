import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const useAuth = (WrappedComponent) => {
  return (props) => {
    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {
      // Redirect to login if the user is not authenticated
      if (!loading && !session) {
        router.replace('/auth/login');
      }
    }, [loading, session, router]);

    if (loading) {
      // Render a loading spinner or placeholder while checking authentication
      return <p>Loading...</p>;
    }

    // Render the protected component if the user is authenticated
    return session ? <WrappedComponent {...props} /> : null;
  };
};

export default useAuth;