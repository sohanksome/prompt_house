'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form'


const Editprompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id')
  const [submitting, setsubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetail = async () => {
        const response = await fetch(`/api/prompt/${promptId}`)
        const data = await response.json()

        setPost({
            prompt: data.prompt,
            tag: data.tag
        })
    }

    if(promptId) getPromptDetail();
  }, [promptId])
  

  const editPrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if(!promptId) return alert('Prompt id not found')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setsubmitting(false)
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt }
    />
  )
}

export default Editprompt