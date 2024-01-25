import { useEffect, useState } from 'react'
import { Note } from './Note'

export function ListedNotes () {
    const [notes, setNotes] = useState([])
    
    useEffect(()=>{
      async function getNotes() {
        const res = await fetch('http://localhost:5000/api/notes')
        const data  = await res.json()
        console.log(data)
        setNotes(data.filter(note => note.archived == false))
      }
      getNotes()
    },[])
    return(
      <section className='notes-list-container'>
        {
          !notes 
            ? <span>Loading...</span>
            : notes.map(note => <Note key={note._id} note={note} />)
        }
      </section>
    )
  }