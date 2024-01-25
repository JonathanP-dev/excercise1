import { useContext, useEffect, useState } from 'react'
import { NotesContext } from '../context/NotesContext'


export function Note ({note}) {
  const [archivedNote, setArchivedNote] = useState(false)
  const [loading, setLoading] = useState(true)
  const {deleteNotes, updateNote} = useContext(NotesContext)
  let {_id, title, tags, content, archived} = note
  
  useEffect(()=>{
    if(note){
      setLoading(false)
      setArchivedNote(archived)
    }
  }, [note])

  const handleDelete = () => {
    deleteNotes({note})
  }

  const handleArchived = async () => {
    setArchivedNote(!archivedNote)
    await updateNote({_id, title, tags, content, archived: !archivedNote })
  }
  return (
      loading || !note ? <span>Adding note..</span>
      :
      <article className='note-container'>
        <section className='note-title-container'>
          <h3 className='note-title'>{note.title}</h3>
          <p className='note-content'>{note.content}</p>
        </section>
        <section className='note-btn-container'>
          <button className='note-btn'>Edit</button>
          <button onClick={handleArchived} className='note-btn'>{!archived ? 'Archive' : 'Unarchived'}</button>
          <button onClick={handleDelete} className='note-btn btn-delete'>Delete</button>
        </section>
      </article>
    
  )
}