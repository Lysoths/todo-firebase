import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert(
            "Sıfırlama linki mail adresinize gönderildi. Bu işlem 5 dakika sürebilir."
          );
        })
        .catch((e) => console.log(e));
    },
    [email]
  );
  return (
    <div className='max-w-md mx-auto py-6 mt-5 p-3'>
      <h1 className='text-2xl'>Giriş Yap</h1>
      <form action='' className='flex flex-col' onSubmit={handleSubmit}>
        <input
          type='email'
          className='p-4 bg-gray-100 rounded-md my-4'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type='submit'
          name=''
          id=''
          className='p-4 bg-purple-400 rounded-md my-4'
        />

        <div className='flex justify-between mt-4'>
          <Link className='' to='/signin'>
            Giriş Yap
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
