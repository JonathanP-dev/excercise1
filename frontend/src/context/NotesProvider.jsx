
import { useContext, useEffect, useState } from 'react';
import { NotesContext } from './NotesContext';

export const useNotes = () => {
  const context = useContext(NotesContext)
  if (context === undefined){
    throw new Error('UseNotes must be used within a NotesContextProvider')
  }
  return context
}

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
        setNotes((prevNotes) => [...prevNotes, newNote]);
        // loadNotes() 
        return [...notes, newNote];
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
    <NotesContext.Provider value={{notes, deleteNotes, createNote}} >
      {children}
    </NotesContext.Provider>
  ) 
}