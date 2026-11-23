import Header from "./components/Header";
import PostList from "./components/PostList";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import { useGetPostsQuery, useGetMeQuery } from "./api/baseApi";
import "./App.css";

function App() {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();
  const { data: user } = useGetMeQuery();

  return (
    <div className="app">
    <Header />

      <main className="main-content">
        <div className="auth-container">
          {user ? (
            <p>Logged in as: {user.email}</p>
          ) : (
            <>
              <RegisterForm />
              <LoginForm />
            </>
          )}
        </div>

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