import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Home.css";
import Todos from "../components/Todos";
import AddPost from "../components/AddPost";
const Home = () => {
  const [user, isLoading] = useAuthState(auth);
  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  if (isLoading) {
    return <h1>Yükleniyor..</h1>;
  }

  return (
    <div className='container mx-auto '>
      <div className='flex items-center justify-between p-1 bg-red-500'>
        <div>
          <p className='text-white ml-2'>Hoşgeldin {user.displayName}</p>
        </div>
        <button
          className='text-white bg-red-500 p-2 rounded-md'
          onClick={handleSignOut}
        >
          Çıkış Yap
        </button>
      </div>
      <div className='flex flex-col items-center min-h-screen p-10 '>
        <AddPost />
        <Todos />
      </div>
    </div>
  );
};

export default Home;
