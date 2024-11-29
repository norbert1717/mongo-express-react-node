import { useState } from "react";

export default function NewBook({ fetchBooks }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    /* 
    - add new data: a függvény visszatér egy form-al
    - formon a submit eseményt figyelem a handlesubmit meg intézi a többit
    - a függvényben lévő értékeket setter segítségével meg tudom jeleníteni az értékeket onchange esemény hatására
    - majd indítok egy fetchet hasonlóan, mint a delete-nél
    - az adatot nem jeleníti meg a frontend automatikusan
    - a newbook is megkapja a fetchBooks függvényt */

    fetch('/api/books/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        author: author,
        genre: genre
      })
    })
      .then(res => res.json())
      .then(() => {
        fetchBooks();
        event.target.reset();
      })
      .catch(err => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="title" onChange={event => setTitle(event.target.value)} />
      <input type="text" placeholder="author" onChange={event => setAuthor(event.target.value)} />
      <input type="text" placeholder="genre" onChange={event => setGenre(event.target.value)} />
      <button>add book</button>
    </form>
  )
}