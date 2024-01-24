import { CreateNote } from './CreateNote';
import { ListedNotes } from './ListedNotes';


export function Home () {
  return (
    <main className='main-container'>
      <CreateNote/>
      <ListedNotes />
    </main>
  )
}