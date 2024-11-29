import { useState } from "react"

export default function Book({ id, title, author, genre, createdAt, updatedAt, fetchBooks }) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newGenre, setNewGenre] = useState(genre);

/*   cél, hogy frontendről szerkesszük az adatot
  - delete: minden könyvbél lesz egy gomb és az onClick esemény átveszi a handledelete függvényt
  a handledelete kap ey fetch-et és elküldi objektumban, hogy id
  - a fetch get metódus, ezért kell megadni a delete metódust
  kitörlődik az elem, de nem frissült a dom, mivel state-ben kell változást lefuttatni */

  const handleDelete = () => fetch('/api/books/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id: id })
  })
    .then(res => res.json())
    .then(() => fetchBooks())
    .catch(err => console.log(err))

  const handleSave = () => {
    /* const body = {}
    if (title !== newTitle) body.title = newTitle
    if (author !== newAuthor) body.author = newAuthor
    if (genre !== newGenre) body.genre = newGenre */

/*     - szerkesztés - backenden jön létre az id illetve a dátumok, minden más szerkeszthető legyen frontenden
    - edit state
    - az input mező értékei eddig propsokból jöttek, de statetté kell cserélni, hogy frissüljön az adat
    - handlesave függvény indít egy fetchet majd megy a patch method és a többi
    - body: csak azokat az elemeket akarjuk összegyűjteni, ahol volt változás
    - hqnel3dlick függvény
      - ha történt változás akkor handlesave metódust futtatjuk le */

    fetch('/api/books/edit', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: id,
        ...title === newTitle ? {} : { title: newTitle },
        ...author === newAuthor ? {} : { author: newAuthor },
        ...genre === newGenre ? {} : { genre: newGenre }
      })
    })
      .then(res => res.json())
      .then(() => {
        fetchBooks();
        setEdit(false);
      })
      .catch(err => console.log(err))
  }

  const handleClick = () => {
    if (!edit) setEdit(true)
    else {
      if (title !== newTitle || author !== newAuthor || genre !== newGenre) {
        console.log("change detected");
        handleSave();
      } else {
        setEdit(false);
      }
    }
  }

  return (
    <div className="book">
      <button onClick={handleDelete}>x</button>
      <button onClick={handleClick}>{edit ? "Save" : "Edit"}</button>
      {edit
        ?
        <>
          <input type="text" placeholder="title" value={newTitle} onChange={event => setNewTitle(event.target.value)} />
          <input type="text" placeholder="author" value={newAuthor} onChange={event => setNewAuthor(event.target.value)} />
          <input type="text" placeholder="genre" value={newGenre} onChange={event => setNewGenre(event.target.value)} />
        </>
        :
        <>
          <h2>{title}</h2>
          <h3>{author}</h3>
          <h4>{genre}</h4>
        </>
      }
      <h5>{id}</h5>
      <p>
        <span>{createdAt}</span>
        <span>{updatedAt}</span>
      </p>
    </div>
  )
}