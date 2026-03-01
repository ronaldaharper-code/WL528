'use client'

import { useState } from 'react'
import { CommentForm } from './CommentForm'
import { timeAgo } from '@/lib/utils'
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
  comment: Comment
  currentUserId: string
  isAdmin: boolean
  entityType: CommentEntityType
  entityId: string
  onReply: (parentId: string, reply: Comment) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, content: string) => void
  depth?: number
}

export function CommentItem({
  comment,
  currentUserId,
  isAdmin,
  entityType,
  entityId,
  onReply,
  onDelete,
  onUpdate,
  depth = 0,
}: Props) {
  const [showReply, setShowReply] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [saving, setSaving] = useState(false)

  const isOwn = comment.author.id === currentUserId
  const canEdit = isOwn && Date.now() - new Date(comment.createdAt).getTime() < 15 * 60 * 1000
  const canDelete = isOwn || isAdmin

  const displayName = comment.author.displayName ?? comment.author.name ?? 'Member'

  const handleDelete = async () => {
    if (!confirm('Delete this comment?')) return
    await fetch(`/api/comments/${comment.id}`, { method: 'DELETE' })
    onDelete(comment.id)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch(`/api/comments/${comment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent }),
    })
    if (res.ok) {
      onUpdate(comment.id, editContent)
      setEditing(false)
    }
    setSaving(false)
  }

  if (comment.status === 'REMOVED') {
    return (
      <div className={`${depth > 0 ? 'ml-8 border-l-2 border-stone-100 pl-4' : ''}`}>
        <p className="text-stone-400 text-sm italic">[Comment removed]</p>
      </div>
    )
  }

  return (
    <div className={depth > 0 ? 'ml-8 border-l-2 border-stone-100 pl-4' : ''}>
      {/* Comment header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0">
          <span className="text-gold-400 text-xs font-bold">{displayName[0].toUpperCase()}</span>
        </div>
        <span className="font-medium text-navy-800 text-sm">{displayName}</span>
        <span className="text-stone-400 text-xs">{timeAgo(comment.createdAt)}</span>
        {comment.updatedAt !== comment.createdAt && (
          <span className="text-stone-400 text-xs italic">(edited)</span>
        )}
        {comment.status === 'PENDING' && (
          <span className="text-xs bg-amber-100 text-amber-700 rounded px-2 py-0.5">Pending</span>
        )}
      </div>

      {/* Content or edit form */}
      {editing ? (
        <form onSubmit={handleEdit} className="mb-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
            maxLength={2000}
            className="form-textarea text-sm mb-2"
          />
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="btn-primary text-sm px-3 py-1">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="btn-ghost text-sm px-3 py-1">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="text-stone-700 text-sm leading-relaxed mb-2 ml-9">{comment.content}</p>
      )}

      {/* Actions */}
      {!editing && (
        <div className="flex gap-3 ml-9 mb-3">
          {depth === 0 && (
            <button
              type="button"
              onClick={() => setShowReply(!showReply)}
              className="text-xs text-navy-600 hover:text-navy-800"
            >
              Reply
            </button>
          )}
          {canEdit && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs text-stone-500 hover:text-stone-700"
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
      )}

      {/* Reply form */}
      {showReply && (
        <div className="ml-9 mb-4">
          <CommentForm
            entityType={entityType}
            entityId={entityId}
            parentId={comment.id}
            placeholder="Reply to this comment…"
            onSuccess={(reply) => {
              onReply(comment.id, reply)
              setShowReply(false)
            }}
            onCancel={() => setShowReply(false)}
          />
        </div>
      )}

      {/* Nested replies */}
      {comment.replies?.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
              entityType={entityType}
              entityId={entityId}
              onReply={onReply}
              onDelete={onDelete}
              onUpdate={onUpdate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
