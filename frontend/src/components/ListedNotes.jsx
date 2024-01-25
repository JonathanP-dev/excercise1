import { useContext, useEffect, useState } from 'react'
import { Note } from './Note'
import { NotesContext } from '../context/NotesContext'

export function ListedNotes () {
    const [archived, setArchived] = useState(false)
    const {notes} = useContext(NotesContext)

    const handleShowArchived = () => {
      setArchived(!archived)
    }

    useEffect(()=>{
      console.log(`Notas actualizadas en listed notes: ${{notes}}`)
    }, [notes])
    
    return(
      <section className='notes-list-container'>
        {
           
          !notes ? <span>Loading...</span>
            : <>
            <>
              <h2 className='note-list-title'>List of Unarchived Notes</h2>
              <button onClick={handleShowArchived}>{!archived ? 'Show Archived Notes' : 'Show Unarchived Notes'}</button>
            </>
            {
              notes.map(note => <Note key={note._id} note={note} />)
            }
            </> 
        }
      </section>
    )
  }