import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/notes")
    .then((response) => {
    console.log(response.data.notes);
    setNotes(response.data.notes);
  });
  };

useEffect(()=>{
  fetchNotes();
},[])

function handleSubmit(e){
  e.preventDefault();

  const {title, description} = e.target.elements;
  console.log(title.value, description.value);

  axios.post("http://localhost:3000/notes", {
    title: title.value,
    description: description.value
  }).then((response)=>{
    console.log(response.data);
    fetchNotes();
  })
}

function handleDeleteNote(noteId){
console.log(noteId);
axios.delete(`http://localhost:3000/notes/${noteId}`)
.then(res=>{
  console.log(res.data);
  fetchNotes();
})

}
  return (
    <>

    <form className="note-create-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter title" />
      <input name="description" type="text" placeholder="Enter Description" />
      <button>Create Note</button>
    </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id || note.id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{handleDeleteNote(note._id || note.id)}} >Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
