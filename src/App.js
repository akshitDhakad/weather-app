import React,{useState} from 'react';
import Home from"./Home"

function App() {
  const [lat ,setLat] = useState("")
  const [lon ,setLon] = useState("")

  function handleLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        return(
          setLat(position.coords.latitude),
          setLon(position.coords.longitude)
        )
      });
    } else { 
       console.log("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div><Home location={handleLocation} lat={lat} lon={lon}/></div>
  );
}

export default App;
