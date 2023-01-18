import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";

const ref = () => {
  if (collection(db, auth.currentUser.uid)) {
    return collection(db, auth.currentUser.uid);
  } else {
    return collection(db, "todos");
  }
};
const AddPost = () => {
  const [todo, setTodo] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (todo === "") {
      alert("To-Do boş olamaz ");
    } else if (todo.length > 30) {
      alert("Maksimum 30 karakter..");
    } else {
      await addDoc(ref(), {
        todo: todo,
        created: auth.currentUser.displayName,
        createdTime: Date.now(),
        complated: "Tamamlanmadı",
      });
      setTodo("");
    }
  };

  return (
    <form className='flex flex-col items-center' onSubmit={addTodo}>
      <input
        type='text'
        placeholder='Todo...'
        className='bg-stone-200 rounded-md m-2 p-2'
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button className='bg-red-400 p-2 rounded-md text-white w-2/4 m-2'>
        Add To-do
      </button>
    </form>
  );
};

export default AddPost;
