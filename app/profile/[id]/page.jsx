'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams()
  const username = searchParams.get('name')
  const [posts, setposts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params?.id}/posts`)
      const data = await res.json()
      setposts(data)
    }

    if (params?.id) fetchPosts()
  }, [params?.id])


  return (
    <Profile
      name={username}
      desc={`welcome to ${username}'s profile`}
      data={posts}
    />
  )
}

export default UserProfile