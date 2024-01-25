
import { useContext, useEffect, useState } from 'react';
import { NotesContext } from './NotesContext';

// export const useNotes = () => {
//   const context = useContext(NotesContext)
//   if (context === undefined){
//     throw new Error('UseNotes must be used within a NotesContextProvider')
//   }
//   return context
// }

export const NotesProvider = ({children}) => {
  const [notes, setNotes] = useState([])
  
  const createNote = async ({title, tags, content, archived}) => {
    // console.log(title, tags,content,archived)
    console.log('Antes de la actualización del estado:', notes);
    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({title, tags, content, archived})
      })
      if(res.ok) {
        const newNote = await res.json();
        setNotes(prevNotes => [...prevNotes, newNote]);
        await loadNotes() 
        // return [...notes, newNote];
      } else {
        console.log('Error al crear la nota');
        console.log(res)
      }
    } catch (error) {
      console.log(error) 
    }
  }
  const updateNote = async ({_id, title, tags, content, archived}) => {

    console.log('Antes de la actualización del estado:', notes);
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${_id}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({title, tags, content, archived})
      })
      if(res.ok) {
        await loadNotes()
      } else {
        console.log('Error al crear la nota');
        console.log(res)
      }
    } catch (error) {
      console.log(error) 
    }
  }
  const loadNotes = async () => {

    try {
      const notesFromDB = await getNotes();
      if (Array.isArray(notesFromDB)) {
        setNotes(notesFromDB);
      } else if (typeof notesFromDB === 'object' && notesFromDB !== null) {
        // Si notesFromDB es un objeto, conviértelo en un array antes de actualizar el estado
        const notesArray = Object.values(notesFromDB);
        setNotes(notesArray);
      } else {
        console.error('Las notas no son un array:', notesFromDB);
      }
    } catch (error) {
      console.error('Error al cargar las notas:', error);
    }
  }
  const getNotes = async () => {
    try {
      // setLoading(true)
      const res = await fetch('http://localhost:5000/api/notes');
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.error('Error al obtener las notas:', error);
      return [];
    } finally {
      // setLoading(false)
    }
  }
  

  useEffect(() => {
    loadNotes();
  }, []);

  const deleteNotes = async({note}) => {
    const id = note._id
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`,{
        method: 'DELETE'
      })
      if(res.ok) {
        const newNotesList = notes.filter((n) => n._id !== id);
        setNotes(newNotesList);
      } else {
        console.log('Error al eliminar la nota');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <NotesContext.Provider value={{notes, deleteNotes, createNote, updateNote}} >
      {children}
    </NotesContext.Provider>
  ) 
}