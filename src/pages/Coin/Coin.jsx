import React, { use, useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData,setHistoricalData]=useState();
  const {currency}=useContext(CoinContext)

  //fetching data of historical
  const fetchHistoricalData= async ()=>{
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
const options = {
  method: 'GET',
  headers: {'x-cg-demo-api-key': apiKey},
  body: undefined
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  setHistoricalData(data);
} catch (error) {
  console.error(error);
}
  }

  //here fetching data of coin
  const fetchCoinData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const options = {
      method: 'GET',
      headers: { 'x-cg-demo-api-key': apiKey },
      body: undefined
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency])

  
  if(coinData, historicalData){
return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData}/>
      </div>

     <div className="coin-info">
      <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>Market cap</li>
        <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour High</li>
        <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour Low</li>
        <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>
     </div>

    </div>
  )
  }else{
    return (
    <div className='spinner'>
      <div className="spin"></div>
      
    </div>
  )
  }
  
}

export default Coin