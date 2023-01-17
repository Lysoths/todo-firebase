import { auth, db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import "../pages/Home";

const deleteRef = collection(db, "todos");
const ref = collection(db, "todos");

const Todos = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    onSnapshot(ref, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const deleteTodo = (id) => {
    if (id === "6HC7o1zF7khjQU6mWHvt") {
      alert("Üzgünüm... bunu silemezsin.");
    } else {
      deleteDoc(doc(db, "todos", id));
    }
  };

  const updateTodo = (id) => {
    const update = doc(db, "todos", id);
    if (id === "6HC7o1zF7khjQU6mWHvt") {
      alert("Evet düzenleme de yapamazsın :)");
    } else {
      updateDoc(update, {
        todo: prompt("enter a new todo"),
      });
    }
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={Math.random()}
          className='flex flex-col items-center p-4 gap-3 boy m-2 rounded-md text-'
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