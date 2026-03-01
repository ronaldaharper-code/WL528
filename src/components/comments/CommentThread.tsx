'use client'

import { useState, useEffect } from 'react'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import { CommentEntityType } from '@prisma/client'

interface Comment {
  id: string
  content: string
  status: string
  createdAt: string
  updatedAt: string
  parentId: string | null
  author: { id: string; name: string | null; displayName: string | null }
  replies: Comment[]
}

interface Props {
  entityType: CommentEntityType
  entityId: string
  currentUserId: string
  isAdmin: boolean
}

export function CommentThread({ entityType, entityId, currentUserId, isAdmin }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?entityType=${entityType}&entityId=${entityId}`)
      const data = await res.json()
      setComments(data.comments ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchComments() }, [entityType, entityId])

  const handleNewComment = (comment: Comment) => {
    setComments((prev) => [...prev, { ...comment, replies: [] }])
  }

  const handleReply = (parentId: string, reply: Comment) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c
      )
    )
  }

  const handleDelete = (commentId: string) => {
    setComments((prev) =>
      prev
        .filter((c) => c.id !== commentId)
        .map((c) => ({ ...c, replies: c.replies.filter((r) => r.id !== commentId) }))
    )
  }

  const handleUpdate = (commentId: string, content: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, content }
          : { ...c, replies: c.replies.map((r) => r.id === commentId ? { ...r, content } : r) }
      )
    )
  }

  return (
    <section aria-label="Member comments" className="mt-8 pt-8 border-t border-stone-200">
      <h3 className="font-serif text-lg font-bold text-navy-800 mb-6">
        Member Discussion
        {comments.length > 0 && (
          <span className="ml-2 text-sm font-normal text-stone-400">({comments.length})</span>
        )}
      </h3>

      {/* New top-level comment */}
      <CommentForm
        entityType={entityType}
        entityId={entityId}
        onSuccess={handleNewComment}
      />

      {/* Comments */}
      <div className="mt-8 space-y-6">
        {loading && (
          <p className="text-stone-400 text-sm">Loading comments…</p>
        )}
        {!loading && comments.length === 0 && (
          <p className="text-stone-400 text-sm">No comments yet. Be the first to share your thoughts.</p>
        )}
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            entityType={entityType}
            entityId={entityId}
            onReply={handleReply}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </section>
  )
}
