import { useState, useRef } from 'react'
import './App.css'
import CategoryList from './CategoryList'
import RandomCategory from './RandomCategory'

const TIME_INTERVAL = 5

function App() {

  const [items, setItems] = useState([])
  const [history, setHistory] = useState([])
  const [category, setCategory] = useState("")
  const [randomCategory, setRandomCategory] = useState("")
  const [count, setCount] = useState(TIME_INTERVAL)
  const [lastRandom, setLastRandom] = useState("")
  const [error, setError] = useState("")
  
  const inputReference = useRef(null);

  const addCategory = (e) => {
    const category = e.target.value
    setCategory(category)
    setError("")
  }

  const removeCategory = (category) => {
    setItems((current) =>
      current.filter((item) => item !== category)
    );
  }

  const removeItemFromHistory = (category) => {
    setHistory((current) =>
      current.filter((item) => item !== category)
    );
  }

  const removeAllItems = () => {
    setItems([])
  }

  const removeAllHistory = () => {
    setHistory([])
  }

  const addToList = (e) => {
    e.preventDefault();
    const categoryFormatted = category.trim()
    if (categoryFormatted.length > 0) {

      const exists = items.some(c => c === categoryFormatted) 
      if (!exists) {
        setItems([...items, categoryFormatted])
        setCategory("")
        inputReference.current.focus(); 
      }
      if (exists) {
        setError("La categoría ya existe!")
      }
    } else {
      setError("Ingrese la categoría correctamente!")
    }
  }
  
  const getRandomItem = () => {
    const min = 0
    const max = items.length - 1

    if (items.length > 0) {
      const index = Math.floor(Math.random() * (max - min + 1)) + min
      setRandomCategory(items[index])
      setCount(TIME_INTERVAL)
    }
  }

  const addToHistory = () => {
    setHistory([...history, randomCategory]) 
    setLastRandom(randomCategory)
  }

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <main className="App-Main">
        <section className="Section Row">
          <div className="One-column">
            <h4>Agregar Categoría</h4>
            <form onSubmit={addToList} className="One-column">
              <div>
                <div className="Row">
                  <input className="Input Input-compact" type="text" name="category" placeholder="Ingrese categoría" value={category} onChange={addCategory} ref={inputReference}/>
                  {error && <p className="Error">{error}</p>}
                  <input className="Button Button-compact" type="submit" value="Agregar"/>
                </div>
              </div>
            </form>
            <button className="Button" onClick={getRandomItem}>Random</button>
            <button className="Button" onClick={removeAllItems}>Remover todas las categorías</button>
            <button className="Button" onClick={removeAllHistory}>Remover historial</button>
          </div>
          {lastRandom.length > 0 && <p>Último resultado: {lastRandom}</p>}
        </section>
        {
          items.length > 0 &&
            <section className="Section">
              <div className="Two-column">
                <CategoryList items={items} removeCategory={removeCategory}/>
                {
                  randomCategory.length > 0 ?
                  <RandomCategory random={randomCategory} count={count} setCount={setCount} addToHistory={addToHistory}/>
                  :
                  <div className="Card"></div>
                }
              </div>
            </section>
        }

        {
          history.length > 0 &&
          <>
            <section className="Section">
              <h4>Historial</h4>
              </section>
            <section className="Section">
              <CategoryList items={history} removeCategory={removeItemFromHistory}/>
            </section>
          </>
        }
      </main>
    </div>
  )
}

export default App
