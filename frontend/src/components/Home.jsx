import { NotesProvider } from '../context/NotesProvider';
import { CreateNote } from './CreateNote';
import { ListedNotes } from './ListedNotes';


export function Home () {
  return ( 
    <NotesProvider>
      <main className='main-container'>
        <CreateNote />
        <ListedNotes />
      </main>
    </NotesProvider>
  )
}