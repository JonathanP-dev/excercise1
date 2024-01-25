

export function Note ({note}) {

  const handleDelete = () => {
    
  }
  return (
    <article className='note-container'>
      <section className='note-title-container'>
        <h3 className='note-title'>{note.title}</h3>
        <p className='note-content'>{note.content}</p>
      </section>
      <section className='note-btn-container'>
        <button className='note-btn'>Edit</button>
        <button className='note-btn'>Archive</button>
        <button onClick={handleDelete} className='note-btn btn-delete'>Delete</button>
      </section>
    </article>
  )
}