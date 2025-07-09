import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { HomePage, AboutPage, UsersPage, PostsPage } from './pages';

import './App.css';
import './pages/pages.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Routes>
        </main>

        <footer className="app__footer">
          <div className="app__footer-content">
            <p>
              Built with React 18 + TypeScript + Vite + Redux Toolkit + React
              Router + i18n + Vitest
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
