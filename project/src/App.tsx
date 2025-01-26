import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookList from './pages/BookList';
import QuotesList from './pages/QuotesList';
import NotFound from './pages/NotFound';
import AuthorsList from './pages/AuthorsList';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="my-book-shelf" element={<BookList />} />
            <Route path="quotes" element={<QuotesList />} />
            <Route path="authors" element={<AuthorsList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
