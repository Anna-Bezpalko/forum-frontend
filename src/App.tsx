import Header from "./components/Header"; 
import PostList from "./components/PostList"; 
import { useGetPostsQuery } from "./api/baseApi"; 
import "./App.css";

function App() { 
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  return ( 
    <div className="app"> 
      <Header />

      <main className="main-content">
        <PostList
          posts={posts}
          isLoading={isLoading}
          isError={isError}
        />
      </main>

      <footer className="footer">
        Made with care for the developer community.
      </footer>
    </div>
  ); 
}

export default App;