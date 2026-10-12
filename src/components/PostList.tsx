import { posts } from "../data/posts"; import PostCard from "./PostCard";
function PostList() { return ( <section className="post-list"> <div className="feed-heading"> <div> <h2>Latest discussions</h2> <p>Explore what the community is talking about.</p> </div>
    <span className="post-count">{posts.length} posts</span>
  </div>

  <div className="posts-grid">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
</section>
); }
export default PostList;