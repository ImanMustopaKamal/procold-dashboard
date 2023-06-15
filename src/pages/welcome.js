import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Welcome() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter()

  useEffect(() => {
    if (status !== 'loading') {
      if (!session?.accessToken) {
        router.push('/auth/login')
      }
    }
  }, [session, status])

  return (
    <div>
      <h1>Welcome Page</h1>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  )
}