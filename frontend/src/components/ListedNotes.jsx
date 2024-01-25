import { useContext, useEffect, useState } from 'react'
import { Note } from './Note'
import { NotesContext } from '../context/NotesContext'

export function ListedNotes () {
    const [archivedText, setArchivedText] = useState(false)
    const {notes} = useContext(NotesContext)

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
                  <button onClick={() => setArchivedText(!archivedText)}>{!archivedText ? 'Show Archived Notes' : 'Show Unarchived Notes'}</button>
                </>
                {notes.map( note => (
                  archivedText && note.archived) || (!archivedText && !note.archived) 
                  ? 
                  (
                    <Note key={note._id} note={note} />
                  ) 
                  : 
                  null
                )}
              </> 
        }
      </section>
    )
  }