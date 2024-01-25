import { useEffect, useState } from 'react'

export function useGetNotes () {
  
  const [loadedNotes, setLoadedNotes] = useState([])
  const [loading, setLoading] = useState(true)

    

  return {loadedNotes, loading, setLoadedNotes}
}