import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import { useAppDispatch } from './redux/hooks';
import { verifyToken } from './redux/utils/verifyToken';
import { setUser, TUser } from './redux/features/auth/authSlice';
import { ScaleLoader } from 'react-spinners';
import ScrollTop from './components/HomePageComponents/ScrollTop';

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const user = verifyToken(token) as TUser;
      if (user) {
        dispatch(setUser({ user, token }));
      }
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen  px-4">
        <ScaleLoader />
      </div>
    );
  }

  return (
    <>
      <div className=" bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900">


        <div className='w-full'>
          <Navbar />
          <ScrollTop />
          <Toaster />
          <main className="w-full overflow-x-hidden">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
