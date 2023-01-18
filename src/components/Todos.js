import { db } from "../firebase";

import {
  collection,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "../pages/Home";

const ref = () => {
  if (collection(db, auth.currentUser.uid)) {
    return collection(db, auth.currentUser.uid);
  } else {
    return collection(db, "todos");
  }
};

const Todos = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState("");
  useEffect(() => {
    onSnapshot(ref(), (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const deleteTodo = (id) => {
    deleteDoc(doc(ref(), id));
  };

  const updateTodo = (id) => {
    const newTodo = prompt("Enter a new todo");
    const update = doc(db, auth.currentUser.uid, id);
    if (newTodo === "") {
      alert("Boş Todo oluşturamazsın");
    } else {
      updateDoc(update, {
        todo: newTodo,
      });
    }
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={Math.random()}
          className='flex flex-col items-center p-4 border-4 border-x-indigo-500 border-y-red-500 gap-3 boy m-2 rounded-md text-'
        >
          <p className='text-justify xxx '>{item.todo}</p>
          <b className='mx-auto'>Oluşturan : {item.created}</b>
          <div className='flex items-center justify-center m-2'>
            <button
              className='bg-red-400 p-2 rounded-md text-white w-20 mr-3'
              onClick={() => deleteTodo(item.id)}
            >
              Sil
            </button>
            <button
              className='bg-red-400 p-2 rounded-md text-white w-20'
              onClick={() => updateTodo(item.id)}
            >
              Düzelt
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Todos;
