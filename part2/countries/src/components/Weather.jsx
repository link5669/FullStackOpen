import { useEffect, useState } from "react";
const api_key = "852fe553d00f4a07e42cdd97a9623273";
const Weather = ({city, country}) => {
    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            const api_call = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}&units=imperial`
            );
            setData(await api_call.json());
        } catch (e) {
            console.log(e)
        }
      };

    useEffect(() => {
        getData();
      }, []);

      if (!data)
      return (
        <>
          <p>Loading..</p>
        </>
      );

      return (
        <div>
            <p>{data.weather[0].main}</p>
        </div>
      )
}

export default Weather
