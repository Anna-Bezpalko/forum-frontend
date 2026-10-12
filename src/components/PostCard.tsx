import type { Post } from "../types/Post";
interface PostCardProps { post: Post; }
function PostCard({ post }: PostCardProps) { return ( <article className="post-card"> <div className="post-card-top"> <span className="post-category">{post.category}</span> <span className="post-id">#{post.id}</span> </div>
  <h2 className="post-title">{post.title}</h2>

  <p className="post-content">{post.content}</p>

  <div className="post-author">
    <span className="author-avatar">
      {post.author.charAt(0)}
    </span>
    <span>{post.author}</span>
  </div>
</article>
); }
export default PostCard;