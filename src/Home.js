import React, { useEffect, useState, useCallback } from 'react';
import "./Home.css";
import ApiKey from "./Key";

function Home(props) {
  const [data, setData] = useState({
    celcius: null,
    name: "Search City",
    humidity: null,
    speed: null,
    description: "Description",
    ID: ""
  });
  const [name, setName] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);


  

  const fetchData = useCallback(() => {
    if (name !== "") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${ApiKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
          setData({
            celcius: json.main.temp,
            name: json.name,
            humidity: json.main.humidity,
            speed: json.wind.speed,
            description: json.weather[0].description,
            ID: json.weather[0].icon
          });
          setName(""); // Reset the name state to an empty string
        })
        .catch(err => console.log("Indefine Data Check the Enter fields"));
    } else if (props.lat !== "" && props.lon !== "") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${ApiKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
          setData({
            celcius: json.main.temp,
            name: json.name,
            humidity: json.main.humidity,
            speed: json.wind.speed,
            description: json.weather[0].description,
            ID: json.weather[0].icon
          });
        })
        .catch(err => console.log("Indefine Data Check the Enter fields"));
    }
  }, [name, props.lat, props.lon]);

  useEffect(() => {
    if (searchClicked) {
      fetchData();
      setSearchClicked(false);
    }
  }, [searchClicked, fetchData]);

  const handleClick = () => {
    setSearchClicked(true);
  };

  const imgURL = `https://openweathermap.org/img/wn/${data.ID}@2x.png`;

  //************** */ data function ********************************

  
    const tdate = new Date();
    const dd = tdate.getDate(); //day
    const MM = tdate.getMonth(); //month
    const yyyy = tdate.getFullYear(); //year
    const todayDate = dd + "-" + (MM + 1) + "-" + yyyy;

    




  return (
    <div className='container'>
     <div className='container1'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoaPKUppdj79Pd9ItFa4nP3nEcGDhWzSAj6A&usqp=CAU' alt='bannerimg'/>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFB9eM_gImASJ_AD4-vRe0KQwPUcoCRF_FTg&usqp=CAU' alt='bannerimg'/>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgaqmPR6wsJx9Wa2OPxpaARbtXKdd7R5uLQ&usqp=CAU' alt='bannerimg'/>
     </div>
      <div className='weather'>
        <div className='search'>
          <input
            id="input"
            type='text'
            placeholder='Enter City Name'
            value={name} // Set the input value to the name state
            onChange={e => setName(e.target.value)}
          />
          <div className='location' onClick={props.location}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pin-map-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
              <path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
            </svg>
          </div>
          <button id="btn">
            <span className="material-symbols-outlined" onClick={handleClick}>
              search
            </span>
          </button>
        </div>
        <div className='winfo'>
          <div className="image">
            <img src={imgURL} alt='cloud Img' style={{ width: "100px" }} />
            <span>{data.description}</span>
          </div>
          <h1>{data.celcius}°C</h1>
          <h2>{data.name}</h2>
          <p>{todayDate}</p>
          <div className='details'>
            <div className='col'>
              <img src='https://cdn-icons-png.flaticon.com/128/481/481453.png' alt="humidity" />

              <div className='humidity'>
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
              <img src='https://cdn-icons-png.flaticon.com/128/2057/2057945.png' alt="wind" />
              <div className='wind'>
                <p>{data.speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container2'>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFB9eM_gImASJ_AD4-vRe0KQwPUcoCRF_FTg&usqp=CAU' alt='bannerimg'/>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzrWYoAGakVcCjTw4cSQSDlt0AsVmfn5w42w&usqp=CAU' alt='bannerimg'/>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRDvCfxP2qGvrirVu4m1y0-wrxDvVlzi6aA&usqp=CAU' alt='bannerimg'/>
        

      </div>
    </div>
  );
}

export default Home;
// https://github.com/akshitDhakad/weather-app.git