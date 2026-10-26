import type { Post } from "../types/Post"; 
import PostCard from "./PostCard";

interface PostListProps { 
  posts: Post[]; 
  isLoading: boolean; 
  isError: boolean; 
}

function PostList({ posts, isLoading, isError }: PostListProps) { 
  return ( 
    <section className="post-list"> 
      <div className="feed-heading"> 
        <div> 
          <h2>Latest discussions</h2> 
          <p>Explore what the community is talking about.</p> 
        </div>

        <span className="post-count">{posts.length} posts</span>
      </div>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : isError ? (
        <p>Failed to load posts. Please try again.</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  ); 
}

export default PostList;