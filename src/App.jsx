import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMartiniGlassCitrus, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

function App() {

  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState({status: false, msg: ""});

  async function fetchDrinks(apiURL) {
    try {
      const url = await fetch(apiURL);
      const response = await url.json();
      setData(response.drinks);
      setLoading(false);
      setIsError({status: false, msg: "" });
      if (!response.drinks) throw new Error("NO JUICE FOUND")
    }
    catch(err) {
      console.error(err);
      setLoading(true);
      setIsError({status: true, msg: err.message || "ERROR IN FETCHING DATA!!!"});
    }
  }

  useEffect(() => {
    const URL = `${url}${input}`
    fetchDrinks(URL);
  }, [input])


  return (
    <>
      <div>
        <div className='d-flex flex-column flex-md-row justify-content-center justify-content-md-around align-items-center position-sticky z-3 top-0 bg-black bg-opacity-75 border border-2 p-2 p-md-1'>
          <h1 className='protest-guerrilla-regular text-white'>
            <FontAwesomeIcon icon={faMartiniGlassCitrus} beatFade/> DRINK FINDER APP <FontAwesomeIcon icon={faMartiniGlassCitrus} beatFade/>
          </h1>
          <input type="text" id='textbox' className='form-control w-auto border-none marko-one-regular' placeholder='Search your drink here!' value={input} onChange={(e) => setInput(e.target.value)} autoComplete='off' autoFocus />
        </div>
        <div className='row justify-content-center align-items-stretch m-0 text-center p-3'>
          {
            loading &&
            !isError?.status &&  
            <h1 className='text-center text-success bg-white w-auto rounded-2 p-3'>
              FETCHING DATA !!! PLEASE WAIT...
            </h1>
          }
          {
            isError?.status && 
            <h1 className='text-danger fw-bold bg-light w-auto rounded-2 p-3'>{isError.msg}</h1>
          }
          {
            !loading && 
            !isError?.status && 
            data.map(({idDrink, strCategory, strDrink, strDrinkThumb }) => {
              return (
                <figure key={idDrink} className='col-12 col-sm-5 col-md-3 mx-1 text-center border border-white rounded-2 py-2 glass-cards align-content-center'>
                  <img src={strDrinkThumb} alt={strDrink} className='w-50 object-fit-cover img-fluid rounded-circle mb-2 border border-3 border-white' />
                  <figcaption className="bg-black text-white p-2 border rounded-2 w-auto mx-auto">
                    <p className="fs-4 mb-1 fw-bold">
                      {strDrink} <FontAwesomeIcon icon={faWineGlass} />
                    </p>
                    <p className="mb-0 fs-6">{strCategory}</p>
                  </figcaption>
                </figure>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
