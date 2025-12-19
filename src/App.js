import { Outlet } from 'react-router-dom'
import {useEffect,useState } from 'react'  

function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    const fetchMinimartData = async () => {
      try {
        const response = await fetch('/minimart-data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setData({ products: [], orders: [], inventory: [], billing: [] });
      }
    };

    fetchMinimartData();
  }, []);
  console.log(data);
  return (
    <div>
    <Outlet 
      context={{
        data,
      }}>
      
    </Outlet>
    </div>
  )
}

export default App
