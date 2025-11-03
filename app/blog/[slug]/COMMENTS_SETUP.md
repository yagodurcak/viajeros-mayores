# Blog Comments Setup Guide

This guide will help you configure the Supabase database and security policies for the blog comments feature.

## Database Schema

The `post_comments` table has been created with the following structure:

```sql
CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  parent_comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE
);
```

## Required Indexes

For better performance, create these indexes:

```sql
-- Index for fetching comments by post
CREATE INDEX idx_post_comments_post_id ON post_comments(post_id);

-- Index for fetching replies
CREATE INDEX idx_post_comments_parent_id ON post_comments(parent_comment_id);

-- Index for ordering by creation date
CREATE INDEX idx_post_comments_created_at ON post_comments(created_at);
```

## Row Level Security (RLS) Policies

Enable RLS and create the following policies in your Supabase dashboard:

### 1. Enable RLS

```sql
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
```

### 2. Read Policy - Anyone can read comments

```sql
CREATE POLICY "Anyone can read comments"
ON post_comments
FOR SELECT
TO public
USING (true);
```

### 3. Create Policy - Authenticated users can create comments

```sql
CREATE POLICY "Authenticated users can create comments"
ON post_comments
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
```

### 4. Update Policy - Users can update their own comments

```sql
CREATE POLICY "Users can update their own comments"
ON post_comments
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

### 5. Delete Policy - Users can delete their own comments

```sql
CREATE POLICY "Users can delete their own comments"
ON post_comments
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
```

## How to Apply These Policies

### Option 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Policies**
3. Find the `post_comments` table
4. Click **Enable RLS** if not already enabled
5. Click **New Policy** for each policy above
6. Copy and paste the SQL from each policy

### Option 2: Using SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste all the SQL commands above
5. Click **Run**

## Testing the Comments Feature

### 1. Test Reading Comments

- Navigate to any blog post
- Comments should load automatically
- If there are no comments, you should see "No comments yet. Be the first to comment!"

### 2. Test Creating Comments (Authentication Required)

- Log in to your application
- Navigate to a blog post
- Click "Write comment"
- Type your comment and click "Post"
- Your comment should appear immediately

### 3. Test Replying to Comments

- Click the "Reply" button on any comment
- Type your reply and click "Post Reply"
- Your reply should appear nested under the parent comment

### 4. Test Without Authentication

- Log out of your application
- Try to click "Write comment"
- You should see an error message: "You must be logged in to comment"

### 5. Test Editing Comments

- Log in to your application
- Find a comment you authored
- Click the "Edit" button (with pencil icon)
- The comment text should become an editable textarea
- Modify the text and click "Save"
- Your changes should be reflected immediately
- Try clicking "Cancel" - your changes should be discarded

### 6. Test Deleting Comments

- Log in to your application
- Find a comment you authored
- Click the "Delete" button (with trash icon)
- A confirmation dialog should appear: "Delete this comment? Yes / No"
- Click "Yes" to delete or "No" to cancel
- If deleted, the comment should disappear immediately
- Note: Deleting a parent comment will also delete all its replies (cascade delete)

### 7. Test Authorization

- Log in with one account and create a comment
- Log in with a different account (or view as another user)
- You should NOT see Edit/Delete buttons on comments you didn't author
- Only the author of a comment can edit or delete it

## Features Implemented

✅ Read all comments for a post
✅ Create new top-level comments
✅ Reply to existing comments (nested/threaded comments)
✅ Edit own comments (authors only)
✅ Delete own comments (authors only)
✅ Display user avatars with initials
✅ Format comment dates
✅ Show loading states
✅ Handle authentication requirements
✅ Error handling and user feedback
✅ Hierarchical comment structure (comments and replies)
✅ Delete confirmation dialog
✅ Inline edit mode with save/cancel

## TypeScript Types

The following types are available:

```typescript
interface ArticleComment {
  id: string;
  comment_text: string;
  created_at: string;
  user_id: string;
  post_id: string;
  parent_comment_id: string | null;
  profiles?: {
    full_name: string | null;
    username: string | null;
  };
  replies?: ArticleComment[];
}
```

## Troubleshooting

### Comments Not Loading

1. Check that RLS policies are properly configured
2. Verify the post exists in the `posts` table
3. Check browser console for errors

### Cannot Create Comments

1. Verify user is authenticated (`supabase.auth.getUser()`)
2. Check that the INSERT policy is enabled
3. Verify the `profiles` table exists and has the necessary fields

### Replies Not Showing

1. Verify the `parent_comment_id` foreign key constraint is set up correctly
2. Check the hierarchical query in `useArticleComments.ts`

## Next Steps

Consider implementing these additional features:

- Like/upvote comments
- Report inappropriate comments
- Comment moderation for admin users
- Email notifications for replies
- Markdown support in comments
- Comment pagination for posts with many comments
- Sort comments by date/popularity
- Pin important comments (admin feature)
- Show edited timestamp if comment was modified
