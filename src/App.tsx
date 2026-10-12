import Header from "./components/Header"; import PostList from "./components/PostList"; import "./App.css";
function App() { return ( <div className="app"> <Header />
  <main className="main-content">
    <PostList />
  </main>

  <footer className="footer">
    Made with care for the developer community.
  </footer>
</div>
); }
export default App;