'use client'

import { useState } from 'react'
import { CommentEntityType } from '@prisma/client'

interface Props {
  entityType: CommentEntityType
  entityId: string
  parentId?: string
  onSuccess: (comment: any) => void
  onCancel?: () => void
  placeholder?: string
}

export function CommentForm({
  entityType,
  entityId,
  parentId,
  onSuccess,
  onCancel,
  placeholder = 'Share your thoughts with fellow lodge members…',
}: Props) {
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'pending'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType, entityId, parentId, content }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to post comment')

      if (data.comment.status === 'PENDING') {
        setStatus('pending')
        setContent('')
      } else {
        onSuccess(data.comment)
        setContent('')
        setStatus('idle')
        if (onCancel) onCancel()
      }
    } catch (err: any) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  if (status === 'pending') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm text-amber-800">
        Your comment has been submitted and is awaiting moderator approval.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor={`comment-${parentId ?? 'root'}`} className="sr-only">
        {parentId ? 'Reply' : 'Add a comment'}
      </label>
      <textarea
        id={`comment-${parentId ?? 'root'}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={parentId ? 2 : 3}
        placeholder={placeholder}
        maxLength={2000}
        className="form-textarea text-sm"
        required
      />
      {errorMsg && <p className="form-error">{errorMsg}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={status === 'submitting' || !content.trim()}
          className="btn-primary text-sm px-4 py-1.5"
        >
          {status === 'submitting' ? 'Posting…' : parentId ? 'Reply' : 'Post Comment'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-ghost text-sm px-4 py-1.5">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
