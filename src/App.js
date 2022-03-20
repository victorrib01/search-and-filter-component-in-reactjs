import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = ({ target }) => {
    setSearch(target.value);
    console.log(target.value);
    console.log(search);
    if (!target.value) {
      setItems(initialList);
      return;
    }
    const lowerSeach = target.value.toLowerCase();
    const filter = items.filter(({ name }) =>
      name.common.toLowerCase().includes(lowerSeach)
    );
    setItems(filter);
  };

  async function load() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setInitialList(result);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {!isLoaded && <div>Loading...</div>}
      {items.length > 0 && (
        <div className="wrapper">
          <div className="search-wrapper">
            <input
              className="search-t"
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Faça a sua pesquisa"
            />
          </div>
          <ul className="card-grid">
            {items.map((item) => (
              <li key={item.name.common}>
                <article className="card">
                  <div className="card-image">
                    <img src={item.flags.png} alt={item.name.common} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-name">{item.name.common}</h2>
                    <ol className="card-list">
                      <li>
                        population: <span>{item.population}</span>
                      </li>
                      <li>
                        Region: <span>{item.region}</span>
                      </li>
                      <li>
                        Capital: <span>{item.capital}</span>
                      </li>
                    </ol>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
