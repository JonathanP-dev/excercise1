import { useContext, useState } from 'react';
import { NotesContext } from '../context/NotesContext';


export function CreateNote () {

  const [tag, setTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const {createNote} = useContext(NotesContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // setNote
    const newNote =
      {
        title,
        tag: tagList.length !== 0 ? [...tagList, tag] : [tag],
        content: text,
        archived: false
      }
    
    if(!newNote.title || !newNote.content) {
      alert(`Empty data. Please check`)
      return
    }
    // POST note
    await createNote(newNote)
    // clear inputs and states.
    const titleInput = document.querySelector('.title-input')
    const tagInput = document.querySelector('.tag-input')
    const textarea = document.querySelector('textarea')
    titleInput.value = ''
    tagInput.value = ''
    textarea.value = ''

    setTag('')
    setText('')
    setTagList([])
    setTitle('')

  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleTag = (e) => {
    setTag(e.target.value)
  }

  const handleAddTag = (e) => {
    e.preventDefault();
    if(!tag) return
    setTagList(prev => [...prev, tag])
    const tagInput = document.querySelector('.tag-input')
    tagInput.value = ''
    setTag('')
    alert(`tag ${tag} added.`)
  }

  const handleText = (e) => {
    setText(e.target.value)
  }

  return(
    <section className='main-note-creation'>
      <h2>Note creation</h2>
      <form className='note-form' onSubmit={handleSubmit}>
        <label className='title-label' htmlFor="title">Title: </label>
        <input className='title-input' onChange={handleTitle} type="text" name="title" id="title" placeholder='Doctor date..' />
        <label className='tag-label' htmlFor="tag">Tag: </label>
        <input className='tag-input' onChange={handleTag} type="text" name="tag" id="tag" placeholder={!tagList ? 'Work..' : tagList} />
        <button className='tag-button' onClick={handleAddTag}>Add Tag</button>
        <textarea className='textarea-note' onChange={handleText} name="noteText" id="" cols="30" rows="10" placeholder='Create web application..'></textarea>
        <button className='create-note-btn' text='Create'>Create Note</button>
      </form>
    </section>
  )
}