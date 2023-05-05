import React, { useState, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import groundTemp from "../src/images/groundtemp.png";
import airTemp from "../src/images/airtemp.png";
import windSpeed from "../src/images/windspeed.png";
import rainTotal from "../src/images/raintotal.png";

import mapIcon from "../src/images/mapIcon.png"
import connectIcon from "../src/images/WirelessIcon.png"

import Axios from 'axios'
import { sizeHeight } from '@mui/system';

import { getWeatherData } from '../src/weather-station-API/callAPI';

export default function Layout({ children }) {

  //set array of three for each value 
  //set values in useEffect block
  const [direction, setDirection] = useState([]);
  const [location, setLocation] = useState([]);
  const [GTA, setGTA] = useState([]);
  const [GTMin, setGTMin] = useState([]);
  const [GTMax, setGTMax] = useState([]);
  const [ATA, setATA] = useState([]);
  const [ATMin, setATMin] = useState([]);
  const [ATMax, setATMax] = useState([]);
  const [WS, setWS] = useState([]);
  const [WSMin, setWSMin] = useState([]);
  const [WSMax, setWSMax] = useState([]);
  const [rainfall, setRainfall] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const [comments, setComments] = useState([])
  useEffect(() => {
    fetchComments();
  }, [])
  useEffect(() => {
    console.log(comments)
    if (comments.length > 0) {
      setLocation([comments.at(0).location, comments.at(1).location, comments.at(2).location]);
      setDirection([comments.at(0).windDirection, comments.at(1).windDirection, comments.at(2).windDirection]);
      setGTA([comments.at(0).groundTemperatureAverage, comments.at(1).groundTemperatureAverage, comments.at(2).groundTemperatureAverage]);
      setGTMax([comments.at(0).groundTemperatureMaximum, comments.at(1).groundTemperatureMaximum, comments.at(2).groundTemperatureMaximum]);
      setGTMin([comments.at(0).groundTemperatureMinimum, comments.at(1).groundTemperatureMinimum, comments.at(2).groundTemperatureMinimum]);
      setATA([comments.at(0).airTemperatureAverage, comments.at(1).airTemperatureAverage, comments.at(2).airTemperatureAverage]);
      setATMax([comments.at(0).airTemperatureMaximum, comments.at(1).airTemperatureMaximum, comments.at(2).airTemperatureMaximum]);
      setATMin([comments.at(0).airTemperatureMinimum, comments.at(1).airTemperatureMinimum, comments.at(2).airTemperatureMinimum]);
      setWS([comments.at(0).windSpeedAverage, comments.at(1).windSpeedAverage, comments.at(2).windSpeedAverage]);
      setWSMax([comments.at(0).windSpeedMaximum, comments.at(1).windSpeedMaximum, comments.at(2).windSpeedMaximum]);
      setWSMin([comments.at(0).windSpeedMinimum, comments.at(1).windSpeedMinimum, comments.at(2).windSpeedMinimum]);
      setRainfall([comments.at(0).totalRainfall, comments.at(1).totalRainfall, comments.at(2).totalRainfall]);
    }
  }, [comments])
  const fetchComments = async () => {
    const response = await Axios('http://localhost:5197/weatherstation');
    setComments(response.data);
  }
  ///MANAUS
  getWeatherData("Manaus").then(data => {
    // Assuming the JSON object is stored in a variable called 'data'
    const currentAddress = data.address;
    const currentLatitude = data.latitude;
    const currentLongitude = data.longitude;
    const currentTimezone = data.timezone;
    const currentConditions = data.currentConditions;
    const currentTemperature = currentConditions["temp"];

    // Extract the relevant data from currentConditions
    const currentTemp = currentConditions.temp;
    console.log(currentTemp);
    const currentWindSpeed = currentConditions.windspeed;
    const currentWindDir = currentConditions.winddir;
    const currentConditionsDesc = currentConditions.conditions;
    const currentFeelsLike = currentConditions.feelslike;
    const currentPrecip = currentConditions.precip;
    const feelsLikeElement = document.getElementById("current-feels-like");
    if (feelsLikeElement !== null) {
      feelsLikeElement.textContent = `Current: ${currentFeelsLike}°F`;
    } else {
      console.error('Feels Like Element not found');
    }
    const currentAddressElement = document.getElementById("current-address");
    if (currentAddressElement !== null) {
      currentAddressElement.textContent = currentAddress;
    } else {
      console.error('Adress Element not found');
    }
    const currentLatitudeElement = document.getElementById("current-latitude");
    if (currentLatitudeElement !== null) {
      currentLatitudeElement.textContent = `${currentLatitude} S,`;
    } else {
      console.error('latitude Element not found');
    }
    const currentLongitudeElement = document.getElementById("current-longitude");
    if (currentLongitudeElement !== null) {
      currentLongitudeElement.textContent = `${currentLongitude} W`;
    } else {
      console.error(' longitude Element not found');
    }
    const currentTimezoneElement = document.getElementById("current-timezone");
    if (currentTimezoneElement !== null) {
      currentTimezoneElement.textContent = currentTimezone;
    } else {
      console.error('currentTimezone Element not found');
    }
    const currentTempElement = document.getElementById("currentTemp");
    if (currentTempElement !== null) {
      currentTempElement.textContent = `Current: ${currentTemp}°F`;
    } else {
      console.error('currentTemp Element not found');
    }
    const currentWindSpeedElement = document.getElementById("currentWindSpeed");
    if (currentWindSpeedElement !== null) {
      currentWindSpeedElement.textContent = `${currentWindSpeed} mph`;
    } else {
      console.error('currentWindSpeed Element not found');
    }
    const currentWindDirElement = document.getElementById("current-wind-direction");
    if (currentWindDirElement !== null) {
      currentWindDirElement.textContent = `${currentWindDir}°`;
    } else {
      console.error('wind-direction Element not found');
    }
    const currentConditionsDescElement = document.getElementById("current-conditions");
    if (currentConditionsDescElement !== null) {
      currentConditionsDescElement.textContent = `Conditions: ${currentConditionsDesc}`;
    } else {
      console.error(' conditions Element not found');
    }
    const currentPrecipElement = document.getElementById("current-precip");
    if (currentPrecipElement !== null) {
      currentPrecipElement.textContent = `${currentPrecip} in`;
    } else {
      console.error(' precip Element not found');
    }
    currentFeelsLike.textContent = `${currentFeelsLike}°F`;
    currentAddressElement.textContent = `${currentAddress}`;
    currentLatitudeElement.textContent = `${currentLatitude} S`;
    currentLongitudeElement.textContent = `${currentLongitude} W`;
    currentTimezoneElement.textContent = `Timezone: ${currentTimezone}`;
    currentTempElement.textContent = `Current: ${currentTemp}°F`;
    currentWindSpeedElement.textContent = `Current: ${currentWindSpeed} mph`;
    currentConditionsDescElement.textContent = `Conditons: ${currentConditionsDesc}`;
    currentPrecipElement.textContent = `${currentPrecip}`;


  }).catch(error => {
    console.error('Error fetching weather data:', error);
  });///MANAUS END

  //SWITZERLAND
  getWeatherData("Switzerland").then(Sdata => {
    // Assuming the JSON object is stored in a variable called 'data'
    const ScurrentAddress = Sdata.address;
    const ScurrentLatitude = Sdata.latitude;
    const ScurrentLongitude = Sdata.longitude;
    const ScurrentTimezone = Sdata.timezone;
    const ScurrentConditions = Sdata.currentConditions;

    // Extract the relevant data from currentConditions
    const ScurrentTemp = ScurrentConditions.temp;
    console.log(ScurrentTemp);
    const ScurrentWindSpeed = ScurrentConditions.windspeed;
    const ScurrentWindDir = ScurrentConditions.winddir;
    const ScurrentConditionsDesc = ScurrentConditions.conditions;
    const ScurrentFeelsLike = ScurrentConditions.feelslike;
    const ScurrentPrecip = ScurrentConditions.precip;
    const SfeelsLikeElement = document.getElementById("Scurrent-feels-like");
    if (SfeelsLikeElement !== null) {
      SfeelsLikeElement.textContent = `Current: ${ScurrentFeelsLike}°F`;
    } else {
      console.error('SFeels Like Element not found');
    }
    const ScurrentAddressElement = document.getElementById("Scurrent-address");
    if (ScurrentAddressElement !== null) {
      ScurrentAddressElement.textContent = ScurrentAddress;
    } else {
      console.error('SAdress Element not found');
    }
    const ScurrentLatitudeElement = document.getElementById("Scurrent-latitude");
    if (ScurrentLatitudeElement !== null) {
      ScurrentLatitudeElement.textContent = `${ScurrentLatitude} S,`;
    } else {
      console.error('Slatitude Element not found');
    }
    const ScurrentLongitudeElement = document.getElementById("Scurrent-longitude");
    if (ScurrentLongitudeElement !== null) {
      ScurrentLongitudeElement.textContent = `${ScurrentLongitude} W`;
    } else {
      console.error(' Slongitude Element not found');
    }
    const ScurrentTimezoneElement = document.getElementById("Scurrent-timezone");
    if (ScurrentTimezoneElement !== null) {
      ScurrentTimezoneElement.textContent = ScurrentTimezone;
    } else {
      console.error('ScurrentTimezone Element not found');
    }
    const ScurrentTempElement = document.getElementById("ScurrentTemp");
    if (ScurrentTempElement !== null) {
      ScurrentTempElement.textContent = `Current: ${ScurrentTemp}°F`;
    } else {
      console.error('ScurrentTemp Element not found');
    }
    const ScurrentWindSpeedElement = document.getElementById("ScurrentWindSpeed");
    if (ScurrentWindSpeedElement !== null) {
      ScurrentWindSpeedElement.textContent = `${ScurrentWindSpeed} mph`;
    } else {
      console.error('ScurrentWindSpeed Element not found');
    }
    const ScurrentWindDirElement = document.getElementById("Scurrent-wind-direction");
    if (ScurrentWindDirElement !== null) {
      ScurrentWindDirElement.textContent = `${ScurrentWindDir}°`;
    } else {
      console.error('wind-direction Element not found');
    }
    const ScurrentConditionsDescElement = document.getElementById("Scurrent-conditions");
    if (ScurrentConditionsDescElement !== null) {
      ScurrentConditionsDescElement.textContent = `Conditions: ${ScurrentConditionsDesc}`;
    } else {
      console.error(' Sconditions Element not found');
    }
    const ScurrentPrecipElement = document.getElementById("Scurrent-precip");
    if (ScurrentPrecipElement !== null) {
      ScurrentPrecipElement.textContent = `${ScurrentPrecip} in`;
    } else {
      console.error(' precip Element not found');
    }
    ScurrentFeelsLike.textContent = `${ScurrentFeelsLike}°F`;
    ScurrentAddressElement.textContent = `${ScurrentAddress}`;
    ScurrentLatitudeElement.textContent = `${ScurrentLatitude} S`;
    ScurrentLongitudeElement.textContent = `${ScurrentLongitude} W`;
    ScurrentTimezoneElement.textContent = `Timezone: ${ScurrentTimezone}`;
    ScurrentTempElement.textContent = `Current: ${ScurrentTemp}°F`;
    ScurrentWindSpeedElement.textContent = `Current: ${ScurrentWindSpeed} mph`;
    ScurrentConditionsDescElement.textContent = `Conditons: ${ScurrentConditionsDesc}`;
    ScurrentPrecipElement.textContent = `${ScurrentPrecip}`;


  }).catch(error => {
    console.error('S Error fetching weather data:', error);
  });
  //SWITZERLAND END


  //EGYPT
  getWeatherData("Egypt").then(Edata => {
    // Assuming the JSON object is stored in a variable called 'data'
    const EcurrentAddress = Edata.address;
    const EcurrentLatitude = Edata.latitude;
    const EcurrentLongitude = Edata.longitude;
    const EcurrentTimezone = Edata.timezone;
    const EcurrentConditions = Edata.currentConditions;

    // Extract the relevant data from currentConditions
    const EcurrentTemp = EcurrentConditions.temp;

    const EcurrentWindSpeed = EcurrentConditions.windspeed;
    const EcurrentWindDir = EcurrentConditions.winddir;
    const EcurrentConditionsDesc = EcurrentConditions.conditions;
    const EcurrentFeelsLike = EcurrentConditions.feelslike;
    const EcurrentPrecip = EcurrentConditions.precip;
    const EfeelsLikeElement = document.getElementById("Ecurrent-feels-like");
    if (EfeelsLikeElement !== null) {
      EfeelsLikeElement.textContent = `Current: ${EcurrentFeelsLike}°F`;
    } else {
      console.error('EFeels Like Element not found');
    }
    const EcurrentAddressElement = document.getElementById("Ecurrent-address");
    if (EcurrentAddressElement !== null) {
      EcurrentAddressElement.textContent = EcurrentAddress;
    } else {
      console.error('EAdress Element not found');
    }
    const EcurrentLatitudeElement = document.getElementById("Ecurrent-latitude");
    if (EcurrentLatitudeElement !== null) {
      EcurrentLatitudeElement.textContent = `${EcurrentLatitude} S,`;
    } else {
      console.error('Elatitude Element not found');
    }
    const EcurrentLongitudeElement = document.getElementById("Ecurrent-longitude");
    if (EcurrentLongitudeElement !== null) {
      EcurrentLongitudeElement.textContent = `${EcurrentLongitude} W`;
    } else {
      console.error(' Elongitude Element not found');
    }
    const EcurrentTimezoneElement = document.getElementById("Ecurrent-timezone");
    if (EcurrentTimezoneElement !== null) {
      EcurrentTimezoneElement.textContent = EcurrentTimezone;
    } else {
      console.error('ScurrentTimezone Element not found');
    }
    const EcurrentTempElement = document.getElementById("EcurrentTemp");
    if (EcurrentTempElement !== null) {
      EcurrentTempElement.textContent = `Current: ${EcurrentTemp}°F`;
    } else {
      console.error('EcurrentTemp Element not found');
    }
    const EcurrentWindSpeedElement = document.getElementById("EcurrentWindSpeed");
    if (EcurrentWindSpeedElement !== null) {
      EcurrentWindSpeedElement.textContent = `${EcurrentWindSpeed} mph`;
    } else {
      console.error('EcurrentWindSpeed Element not found');
    }
    const EcurrentWindDirElement = document.getElementById("Ecurrent-wind-direction");
    if (EcurrentWindDirElement !== null) {
      EcurrentWindDirElement.textContent = `${EcurrentWindDir}°`;
    } else {
      console.error('Ewind-direction Element not found');
    }
    const EcurrentConditionsDescElement = document.getElementById("Ecurrent-conditions");
    if (EcurrentConditionsDescElement !== null) {
      EcurrentConditionsDescElement.textContent = `Conditions: ${EcurrentConditionsDesc}`;
    } else {
      console.error(' Econditions Element not found');
    }
    const EcurrentPrecipElement = document.getElementById("Ecurrent-precip");
    if (EcurrentPrecipElement !== null) {
      EcurrentPrecipElement.textContent = `${EcurrentPrecip} in`;
    } else {
      console.error(' E precip Element not found');
    }
    EcurrentFeelsLike.textContent = `${EcurrentFeelsLike}°F`;
    EcurrentAddressElement.textContent = `${EcurrentAddress}`;
    EcurrentLatitudeElement.textContent = `${EcurrentLatitude} S`;
    EcurrentLongitudeElement.textContent = `${EcurrentLongitude} W`;
    EcurrentTimezoneElement.textContent = `Timezone: ${EcurrentTimezone}`;
    EcurrentTempElement.textContent = `Current: ${EcurrentTemp}°F`;
    EcurrentWindSpeedElement.textContent = `Current: ${EcurrentWindSpeed} mph`;
    EcurrentConditionsDescElement.textContent = `Conditons: ${EcurrentConditionsDesc}`;
    EcurrentPrecipElement.textContent = `${EcurrentPrecip}`;


  }).catch(error => {
    console.error('E Error fetching weather data:', error);
  });
  //EGPTY END



  return (






    <>
      <div className="navigation-wrapper">

        <div
          ref={sliderRef}
          className="keen-slider"

        >
          <div
            className="keen-slider__slide number-slide1"
          >


            <div style={{
              width: "100%",


            }}>
              <div className='titleHeader1'>
                <div className="titleCardDiv" style={{ padding: 250 }}>
                  <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 0.9)', }}>
                    <CardContent>
                      <div className="tempIcon">
                        <img className="imgSize" src={mapIcon} />
                      </div>
                      <Typography
                        id="current-address"
                        style={{ fontSize: 44 }}
                        color="black"
                        gutterBottom
                      >
                      </Typography>

                      <Typography className="stationStatus" variant="h5" component="h2">
                        Station Status: <b>Online</b>
                      </Typography>
                      <Typography className="stationCordinates" variant="h5" component="h2">
                        <Typography id='current-timezone' className="stationCordinates" variant="h5" component="h2">
                        </Typography>
                        <div className='organization'>
                          <Typography id='current-latitude' className="stationCordinates" variant="h5" component="h2">
                          </Typography>

                          <Typography id='current-longitude' className="stationCordinates" variant="h5" component="h2">
                          </Typography>
                        </div>
                        <h3 id='current-conditions'></h3>

                      </Typography>
                    </CardContent>

                  </Card>

                </div>


              </div>

            </div>



            <div>
              {location.at(0)}

            </div>

            <div className='scrollView' >


              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={windSpeed} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Wind Speed
                    </Typography>
                    <div className='organization'>

                      <Typography id="currentWindSpeed" className="wind-speed current" variant="h5" component="h2">
                      </Typography>


                    </div>

                    <div className='organization'>
                      <Typography className="wind-speed average" variant="h5" component="h2">
                        Average: <b>{WS.at(0)}13 mph</b>
                      </Typography>
                      <Typography className="wind-speed min" variant="h5" component="h2">
                        Minimum: <b>{WSMin.at(0)}2 mph</b>
                      </Typography>
                      <Typography className="wind-speed max" variant="h5" component="h2">
                        Maximum: <b>{WSMax.at(0)}22 mph</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: '100px', boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      <div className="wind-direction"> <b>{direction.at(0)}</b> </div>
                      <div className="wind-direction-title">Wind Direction</div>
                      <div className='wind-direction-icon'>
                        <h7 id='current-wind-direction'>

                        </h7>
                      </div>




                    </Typography>
                  </CardContent>

                </Card>


              </div>
              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={groundTemp} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Ground Temperature
                    </Typography>

                    <div className='organization'>

                      <Typography id="currentTemp" className="wind-speed current" variant="h5" component="h2">
                      </Typography>

                    </div>

                    <div className='organization'>
                      <Typography className="ground-temp average" variant="h5" component="h2">
                        Average: <b>{GTA.at(0)} 80°F</b>
                      </Typography>
                      <Typography className="ground-temp min" variant="h5" component="h2">
                        Minimum: <b>{GTMin.at(0)} 72°F</b>
                      </Typography>
                      <Typography className="ground-temp max" variant="h5" component="h2">
                        Maximum: <b>{GTMax.at(0)} 99°F</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={airTemp} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Air Temperature
                    </Typography>
                    <div className='organization'>

                      <Typography id="current-feels-like" className="wind-speed current" variant="h5" component="h2">
                      </Typography>

                    </div>



                    <div className='organization'>
                      <Typography className="ground-temp average" variant="h5" component="h2">
                        Average: <b>{ATA.at(0)} 75°F</b>
                      </Typography>
                      <Typography className="ground-temp min" variant="h5" component="h2">
                        Minimum: <b>{ATMin.at(0)} 69°F</b>
                      </Typography>
                      <Typography className="ground-temp max" variant="h5" component="h2">
                        Maximum: <b>{ATMax.at(0)} 90°F</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>


              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>

                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      <div className="rainfall-icon"> <img className="rainfall-image-size" src={rainTotal} /> </div>
                      <div className="rainfall-title">Total Rainfall</div>
                      <div className="rainfall" variant="h5" component="h2">
                        <h7 id='current-precip'></h7>
                      </div>
                    </Typography>


                  </CardContent>

                </Card>
              </div>
            </div>
          </div>










          <div className="keen-slider__slide number-slide2">


            <div style={{
              width: "100%",
            }}>
              <div className='titleHeader2'>
                <div className="titleCardDiv" style={{ padding: 250 }}>
                  <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 0.9)', }}>
                    <CardContent>
                      <div className="tempIcon">
                        <img className="imgSize" src={mapIcon} />
                      </div>
                      <Typography
                        id="Scurrent-address"
                        style={{ fontSize: 44 }}
                        color="black"
                        gutterBottom
                      >
                      </Typography>

                      <Typography className="SstationStatus" variant="h5" component="h2">
                        Station Status: <b>Online</b>
                      </Typography>
                      <Typography className="stationCordinates" variant="h5" component="h2">
                        <Typography id='Scurrent-timezone' className="stationCordinates" variant="h5" component="h2">
                        </Typography>
                        <div className='organization'>
                          <Typography id='Scurrent-latitude' className="stationCordinates" variant="h5" component="h2">
                          </Typography>

                          <Typography id='Scurrent-longitude' className="stationCordinates" variant="h5" component="h2">
                          </Typography>
                        </div>
                        <h3 id='Scurrent-conditions'></h3>

                      </Typography>
                    </CardContent>

                  </Card>

                </div>


              </div>

            </div>



            <div>
              {location.at(0)}

            </div>

            <div className='scrollView' >

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={windSpeed} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Wind Speed
                    </Typography>
                    <div className='organization'>

                      <Typography id="ScurrentWindSpeed" className="wind-speed current" variant="h5" component="h2">
                      </Typography>


                    </div>

                    <div className='organization'>
                      <Typography className="wind-speed average" variant="h5" component="h2">
                        Average: <b>{WS.at(0)}18 mph</b>
                      </Typography>
                      <Typography className="wind-speed min" variant="h5" component="h2">
                        Minimum: <b>{WSMin.at(0)}8 mph</b>
                      </Typography>
                      <Typography className="wind-speed max" variant="h5" component="h2">
                        Maximum: <b>{WSMax.at(0)}33 mph</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: '100px', boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      <div className="wind-direction"> <b>{direction.at(0)}</b> </div>
                      <div className="wind-direction-title">Wind Direction</div>
                      <div className='wind-direction-icon'>
                        <h7 id='Scurrent-wind-direction'>

                        </h7>
                      </div>




                    </Typography>
                  </CardContent>

                </Card>


              </div>



              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={groundTemp} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Ground Temperature
                    </Typography>

                    <div className='organization'>

                      <Typography id="ScurrentTemp" className="wind-speed current" variant="h5" component="h2">
                      </Typography>

                    </div>

                    <div className='organization'>
                      <Typography className="ground-temp average" variant="h5" component="h2">
                        Average: <b>{GTA.at(0)} 38°F</b>
                      </Typography>
                      <Typography className="ground-temp min" variant="h5" component="h2">
                        Minimum: <b>{GTMin.at(0)} 33°F</b>
                      </Typography>
                      <Typography className="ground-temp max" variant="h5" component="h2">
                        Maximum: <b>{GTMax.at(0)} 54°F</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={airTemp} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Air Temperature
                    </Typography>
                    <div className='organization'>

                      <Typography id="Scurrent-feels-like" className="wind-speed current" variant="h5" component="h2">
                      </Typography>

                    </div>



                    <div className='organization'>
                      <Typography className="ground-temp average" variant="h5" component="h2">
                        Average: <b>{ATA.at(0)} 35°F</b>
                      </Typography>
                      <Typography className="ground-temp min" variant="h5" component="h2">
                        Minimum: <b>{ATMin.at(0)} 30°F</b>
                      </Typography>
                      <Typography className="ground-temp max" variant="h5" component="h2">
                        Maximum: <b>{ATMax.at(0)} 51°F</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>


              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>

                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      <div className="rainfall-icon"> <img className="rainfall-image-size" src={rainTotal} /> </div>
                      <div className="rainfall-title">Total Rainfall</div>
                      <div className="rainfall" variant="h5" component="h2">
                        <h7 id='Scurrent-precip'></h7>
                      </div>
                    </Typography>


                  </CardContent>

                </Card>
              </div>
            </div>
          </div>








          <div className="keen-slider__slide number-slide3">


            <div style={{
              width: "100%",

            }}>
              <div className='titleHeader3'>
                <div className="titleCardDiv" style={{ padding: 250 }}>
                  <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 0.9)', }}>
                    <CardContent>
                      <div className="tempIcon">
                        <img className="imgSize" src={mapIcon} />
                      </div>
                      <Typography
                        id="Ecurrent-address"
                        style={{ fontSize: 44 }}
                        color="black"
                        gutterBottom
                      >
                      </Typography>

                      <Typography className="stationStatus" variant="h5" component="h2">
                        Station Status: <b>Online</b>
                      </Typography>
                      <Typography className="stationCordinates" variant="h5" component="h2">
                        <Typography id='Ecurrent-timezone' className="stationCordinates" variant="h5" component="h2">
                        </Typography>
                        <div className='organization'>
                          <Typography id='Ecurrent-latitude' className="stationCordinates" variant="h5" component="h2">
                          </Typography>

                          <Typography id='Ecurrent-longitude' className="stationCordinates" variant="h5" component="h2">
                          </Typography>
                        </div>
                        <h3 id='Ecurrent-conditions'></h3>

                      </Typography>
                    </CardContent>

                  </Card>

                </div>


              </div>

            </div>



            <div>
              {location.at(0)}

            </div>

            <div className='scrollView' >

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={windSpeed} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Wind Speed
                    </Typography>
                    <div className='organization'>

                      <Typography id="EcurrentWindSpeed" className="wind-speed current" variant="h5" component="h2">
                      </Typography>


                    </div>

                    <div className='organization'>
                      <Typography className="wind-speed average" variant="h5" component="h2">
                        Average: <b>{WS.at(0)}8 mph</b>
                      </Typography>
                      <Typography className="wind-speed min" variant="h5" component="h2">
                        Minimum: <b>{WSMin.at(0)}3 mph</b>
                      </Typography>
                      <Typography className="wind-speed max" variant="h5" component="h2">
                        Maximum: <b>{WSMax.at(0)}12 mph</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: '100px', boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      <div className="wind-direction"> <b>{direction.at(0)}</b> </div>
                      <div className="wind-direction-title">Wind Direction</div>
                      <div className='wind-direction-icon'>
                        <h7 id='Ecurrent-wind-direction'>

                        </h7>
                      </div>




                    </Typography>
                  </CardContent>

                </Card>

              </div>

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={airTemp} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Ground Temperature
                    </Typography>
                    <div className='organization'>

                      <Typography id="Ecurrent-feels-like" className="wind-speed current" variant="h5" component="h2">
                      </Typography>

                    </div>



                    <div className='organization'>
                      <Typography className="ground-temp average" variant="h5" component="h2">
                        Average: <b>{ATA.at(0)} 75°F</b>
                      </Typography>
                      <Typography className="ground-temp min" variant="h5" component="h2">
                        Minimum: <b>{ATMin.at(0)} 64°F</b>
                      </Typography>
                      <Typography className="ground-temp max" variant="h5" component="h2">
                        Maximum: <b>{ATMax.at(0)} 82°F</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>

              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>
                    <div className="tempIcon">
                      <img className="imgSize" src={airTemp} />
                    </div>
                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      Air Temperature
                    </Typography>
                    <div className='organization'>

                      <Typography id="EcurrentTemp" className="wind-speed current" variant="h5" component="h2">
                      </Typography>

                    </div>



                    <div className='organization'>
                      <Typography className="ground-temp average" variant="h5" component="h2">
                        Average: <b>{ATA.at(0)} 77°F</b>
                      </Typography>
                      <Typography className="ground-temp min" variant="h5" component="h2">
                        Minimum: <b>{ATMin.at(0)} 60°F</b>
                      </Typography>
                      <Typography className="ground-temp max" variant="h5" component="h2">
                        Maximum: <b>{ATMax.at(0)} 86°F</b>
                      </Typography>
                    </div>
                  </CardContent>

                </Card>
              </div>





              <div className="cardDiv" style={{ padding: 20 }}>
                <Card className="card-t full-width" style={{ width: "95%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 1)', }}>
                  <CardContent>

                    <Typography
                      style={{ fontSize: 40 }}
                      color="black"
                      gutterBottom
                    >
                      <div className="rainfall-icon"> <img className="rainfall-image-size" src={rainTotal} /> </div>
                      <div className="rainfall-title">Total Rainfall</div>
                      <div className="rainfall" variant="h5" component="h2">
                        <h7 id='Ecurrent-precip'></h7>
                      </div>
                    </Typography>


                  </CardContent>

                </Card>
              </div>




            </div>
          </div>

        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div >
      {
        loaded && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              );
            })}
          </div>
        )
      }
    </>
  );
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? "arrow--left" : "arrow--right"
        } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (

        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}