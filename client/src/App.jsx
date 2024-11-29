/* 
 cors beálítása kell ahhoz, hogy működjön a backend meg a frontend együtt
 cél, hogy frontendről szerkesszük az adatot
  - delete: minden könyvbél lesz egy gomb és az onClick esemény átveszi a handledelete függvényt
  a handledelete kap ey fetch-et és elküldi objektumban, hogy id
  - a fetch get metódus, ezért kell megadni a delete metódust
  kitörlődik az elem, de nem frissült a dom, mivel state-ben kell változást lefuttatni
  - add new data: a függvény visszatér egy form-al
  - formon a submit eseményt figyelem a handlesubmit meg intézi a többit
    - a függvényben lévő értékeket setter segítségével meg tudom jeleníteni az értékeket onchange esemény hatására
    - majd indítok egy fetchet hasonlóan, mint a delete-nél
    - az adatot nem jeleníti meg a frontend automatikusan
    - a newbook is megkapja a fetchBooks függvényt
  - szerkesztés - backenden jön létre az id illetve a dátumok, minden más szerkeszthető legyen frontenden
    - edit state
    - az input mező értékei eddig propsokból jöttek, de statetté kell cserélni, hogy frissüljön az adat
    - handlesave függvény indít egy fetchet majd megy a patch method és a többi
    - body: csak azokat az elemeket akarjuk összegyűjteni, ahol volt változás
    - hqnel3dlick függvény
      - ha történt változás akkor handlesave metódust futtatjuk le
        
*/

import { useEffect, useState } from 'react'
import './App.css'
import Book from './components/Book';
import NewBook from './components/NewBook';

function App() {
  const [books, setBooks] = useState(null);

  const fetchBooks = () => fetch("/api/books/all")
    .then(res => res.json())
    .then(data => setBooks(data))
    .catch(err => console.log(err))

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className='app'>
      {books &&
        <div className='content'>
          <NewBook fetchBooks={fetchBooks} />
          {books.map(book => <Book
            key={book._id}
            id={book._id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            createdAt={book.createdAt}
            updatedAt={book.updatedAt}
            fetchBooks={fetchBooks}
          />)}
        </div>
      }
    </div>
  )
}

export default App
