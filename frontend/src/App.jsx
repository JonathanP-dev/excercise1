import { useEffect, useState } from 'react'


export default function App() {
  const [notes, setNotes] = useState([])

  useEffect(()=>{
    async function getNotes() {
      const res = await fetch('http://localhost:5000/api/notes')
      const data  = await res.json()
      console.log(data)
      setNotes(data)
    }
    getNotes()
  },[notes])

  return (
    <>
      <div>
        Notes App
        {!notes ? <div>Loading..</div> 
        : notes.map(note => <div key={note._id}>{note.title}</div>)
        }
      </div>
    </>
  )
}
