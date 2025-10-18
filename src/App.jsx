// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'Atomic Habits', author: 'James Clear', year: 2015 },
    { id: 2, title: 'How To Win Friends And Influence People', author: 'Dale Carnage', year: 1996 }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');

  // FITUR 1: TAMBAH DATA
  const handleAddBook = (e) => {
    e.preventDefault();

    if (!newTitle || !newAuthor) {
      alert('Judul dan Penulis tidak boleh kosong!');
      return;
    }

    const newBook = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
      year: parseInt(newYear),
    };

    setBooks([...books, newBook]);
    setNewTitle('');
    setNewAuthor('');
    setNewYear(new Date().getFullYear());
  };

  // FITUR 3: HAPUS DATA
  const handleDeleteBook = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      const updatedBooks = books.filter(book => book.id !== id);
      setBooks(updatedBooks);
    }
  };

  // FITUR TAMBAHAN: PENCARIAN
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Manajemen Perpustakaan</h1>
        <p>Kelola koleksi buku Anda dengan mudah</p>
      </header>

      <main className="app-main">
        {/* --- FORM TAMBAH BUKU --- */}
        <section className="add-book-section">
          <div className="section-header">
            <h2>Tambah Buku Baru</h2>
          </div>
          <form onSubmit={handleAddBook} className="book-form">
            <div className="form-group">
              <label htmlFor="title">Judul Buku</label>
              <input
                id="title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Masukkan judul buku..."
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="author">Penulis</label>
              <input
                id="author"
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Masukkan nama penulis..."
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="year">Tahun Terbit</label>
              <input
                id="year"
                type="number"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                min="1900"
                max={new Date().getFullYear()}
                className="form-input"
              />
            </div>
            
            <button type="submit" className="btn-primary">
              ➕ Tambah Buku
            </button>
          </form>
        </section>

        {/* --- FITUR PENCARIAN --- */}
        <section className="search-section">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari buku berdasarkan judul atau penulis..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </section>

        {/* --- DAFTAR BUKU --- */}
        <section className="books-section">
          <div className="section-header">
            <h2>Daftar Buku ({filteredBooks.length})</h2>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <p>{searchTerm ? 'Buku tidak ditemukan' : 'Belum ada buku dalam koleksi'}</p>
              {!searchTerm && (
                <button 
                  onClick={() => document.querySelector('.book-form').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary"
                >
                  Tambah Buku Pertama
                </button>
              )}
            </div>
          ) : (
            <div className="books-grid">
              {filteredBooks.map(book => (
                <div key={book.id} className="book-card">
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">✍️ oleh {book.author}</p>
                    <p className="book-year">📅 {book.year}</p>
                  </div>
                  <div className="book-actions">
                    <button 
                      onClick={() => handleDeleteBook(book.id)}
                      className="btn-danger"
                      title="Hapus buku"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Manajemen Perpustakaan</p>
      </footer>
    </div>
  );
}

export default App;