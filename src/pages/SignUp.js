import { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        alert("Kullanıcı adı ya da şifre boş olamaz ! ");
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          updateProfile(auth.user, { displayName: name });
        })
        .catch((e) =>
          e.code === "auth/email-already-in-use"
            ? alert("Bu email adresi daha önce alınmış")
            : alert("Hatalı email ya da şifre")
        );
    },
    [name, email, password]
  );
  return (
    <div className='max-w-md mx-auto py-6 mt-5 p-3'>
      <h1 className='text-2xl'>Yeni Kullanıcı Oluştur</h1>
      <form action='' className='flex flex-col ' onSubmit={handleSubmit}>
        <input
          type='text'
          className='p-4 bg-gray-100 rounded-md my-4'
          placeholder='İsim Soyisim'
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type='email'
          className='p-4 bg-gray-100 rounded-md my-4'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type='password'
          className='p-4 bg-gray-100 rounded-md my-4'
          placeholder='Şifre'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type='Submit'
          name=''
          id=''
          className='p-4 bg-blue-300 rounded-md mt-3'
        />
        <Link to='/signin' className='mt-5 text-md'>
          Üye misin? Giriş yap.
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
