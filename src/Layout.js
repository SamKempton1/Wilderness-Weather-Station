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

import Axios from 'axios'

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
            <div>
              {location.at(0)}
            </div>

            <Card className="card-t bottom-left" style={{ width: "40%", height: "40%", right: "15%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="wind-speed average" variant="h5" component="h2">
                  Average: <b>{WS.at(0)} mph</b>
                </Typography>
                <Typography className="wind-speed min" variant="h5" component="h2">
                  Minimum: <b>{WSMin.at(0)} mph</b>
                </Typography>
                <Typography className="wind-speed max" variant="h5" component="h2">
                  Maximum: <b>{WSMax.at(0)} mph</b>
                </Typography>
              </CardContent>

            </Card>

            <Card className="card-t top-left" style={{ width: "40%", height: "40%", right: "50%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="ground-temp average" variant="h5" component="h2">
                  Average: <b>{GTA.at(0)} °F</b>
                </Typography>
                <Typography className="ground-temp min" variant="h5" component="h2">
                  Minimum: <b>{GTMin.at(0)} °F</b>
                </Typography>
                <Typography className="ground-temp max" variant="h5" component="h2">
                  Maximum: <b>{GTMax.at(0)} °F</b>
                </Typography>
              </CardContent>

            </Card>

            <Card className="card-t top-right" style={{ width: "40%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="ground-temp average" variant="h5" component="h2">
                  Average: <b>{ATA.at(0)} °F</b>
                </Typography>
                <Typography className="ground-temp min" variant="h5" component="h2">
                  Minimum: <b>{ATMin.at(0)} °F</b>
                </Typography>
                <Typography className="ground-temp max" variant="h5" component="h2">
                  Maximum: <b>{ATMax.at(0)} °F</b>
                </Typography>
              </CardContent>

            </Card>
            <Card className="card-t bottom-right1" style={{ width: "18%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
              <CardContent>
                <Typography
                  style={{ fontSize: 40 }}
                  color="black"
                  gutterBottom
                >
                  <div className="wind-direction"> <b>{direction.at(0)}</b> </div>
                  <div className="wind-direction-title">Wind Direction</div>

                </Typography>
              </CardContent>

            </Card>
            <Card className="card-t bottom-right2" style={{ width: "18%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
              <CardContent>

                <Typography
                  style={{ fontSize: 40 }}
                  color="black"
                  gutterBottom
                >
                  <div className="rainfall-icon"> <img className="rainfall-image-size" src={rainTotal} /> </div>
                  <div className="rainfall-title">Total Rainfall</div>
                  <div className="rainfall" variant="h5" component="h2">
                    <b>{rainfall.at(0)} in</b></div>
                </Typography>


              </CardContent>

            </Card>
          </div>
          <div className="keen-slider__slide number-slide2">
            <div>
              {location.at(1)}
            </div>
            <Card className="card-t bottom-left" style={{ width: "40%", height: "40%", right: "15%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="wind-speed average" variant="h5" component="h2">
                  Average: <b>{WS.at(1)} mph</b>
                </Typography>
                <Typography className="wind-speed min" variant="h5" component="h2">
                  Minimum: <b>{WSMin.at(1)} mph</b>
                </Typography>
                <Typography className="wind-speed max" variant="h5" component="h2">
                  Maximum: <b>{WSMax.at(1)} mph</b>
                </Typography>
              </CardContent>

            </Card>

            <Card className="card-t top-left" style={{ width: "40%", height: "40%", right: "50%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="ground-temp average" variant="h5" component="h2">
                  Average: <b>{GTA.at(1)} °F</b>
                </Typography>
                <Typography className="ground-temp min" variant="h5" component="h2">
                  Minimum: <b>{GTMin.at(1)} °F</b>
                </Typography>
                <Typography className="ground-temp max" variant="h5" component="h2">
                  Maximum: <b>{GTMax.at(1)} °F</b>
                </Typography>
              </CardContent>

            </Card>

            <Card className="card-t top-right" style={{ width: "40%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="ground-temp average" variant="h5" component="h2">
                  Average: <b>{ATA.at(1)} °F</b>
                </Typography>
                <Typography className="ground-temp min" variant="h5" component="h2">
                  Minimum: <b>{ATMin.at(1)} °F</b>
                </Typography>
                <Typography className="ground-temp max" variant="h5" component="h2">
                  Maximum: <b>{ATMax.at(1)} °F</b>
                </Typography>
              </CardContent>

            </Card>
            <Card className="card-t bottom-right1" style={{ width: "18%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
              <CardContent>
                <Typography
                  style={{ fontSize: 40 }}
                  color="black"
                  gutterBottom
                >
                  <div className="wind-direction"> <b>{direction.at(1)}</b> </div>
                  <div className="wind-direction-title">Wind Direction</div>

                </Typography>
              </CardContent>

            </Card>
            <Card className="card-t bottom-right2" style={{ width: "18%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
              <CardContent>

                <Typography
                  style={{ fontSize: 40 }}
                  color="black"
                  gutterBottom
                >
                  <div className="rainfall-icon"> <img className="rainfall-image-size" src={rainTotal} /> </div>
                  <div className="rainfall-title">Total Rainfall</div>
                  <div className="rainfall" variant="h5" component="h2">
                    <b>{rainfall.at(1)} in</b></div>
                </Typography>


              </CardContent>

            </Card>

          </div>
          <div className="keen-slider__slide number-slide3">
            <div>
              {location.at(2)}
            </div>
            <Card className="card-t bottom-left" style={{ width: "40%", height: "40%", right: "15%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="wind-speed average" variant="h5" component="h2">
                  Average: <b>{WS.at(2)} mph</b>
                </Typography>
                <Typography className="wind-speed min" variant="h5" component="h2">
                  Minimum: <b>{WSMin.at(2)} mph</b>
                </Typography>
                <Typography className="wind-speed max" variant="h5" component="h2">
                  Maximum: <b>{WSMax.at(2)} mph</b>
                </Typography>
              </CardContent>

            </Card>

            <Card className="card-t top-left" style={{ width: "40%", height: "40%", right: "50%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="ground-temp average" variant="h5" component="h2">
                  Average: <b>{GTA.at(2)} °F</b>
                </Typography>
                <Typography className="ground-temp min" variant="h5" component="h2">
                  Minimum: <b>{GTMin.at(2)} °F</b>
                </Typography>
                <Typography className="ground-temp max" variant="h5" component="h2">
                  Maximum: <b>{GTMax.at(2)} °F</b>
                </Typography>
              </CardContent>

            </Card>

            <Card className="card-t top-right" style={{ width: "40%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
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
                <Typography className="ground-temp average" variant="h5" component="h2">
                  Average: <b>{ATA.at(2)} °F</b>
                </Typography>
                <Typography className="ground-temp min" variant="h5" component="h2">
                  Minimum: <b>{ATMin.at(2)} °F</b>
                </Typography>
                <Typography className="ground-temp max" variant="h5" component="h2">
                  Maximum: <b>{ATMax.at(2)} °F</b>
                </Typography>
              </CardContent>

            </Card>
            <Card className="card-t bottom-right1" style={{ width: "18%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
              <CardContent>
                <Typography
                  style={{ fontSize: 40 }}
                  color="black"
                  gutterBottom
                >
                  <div className="wind-direction"> <b>{direction.at(2)}</b> </div>
                  <div className="wind-direction-title">Wind Direction</div>

                </Typography>
              </CardContent>

            </Card>
            <Card className="card-t bottom-right2" style={{ width: "18%", height: "40%", boxSizing: "2%", backgroundColor: 'rgba(239, 242, 225, 0.4)', }}>
              <CardContent>

                <Typography
                  style={{ fontSize: 40 }}
                  color="black"
                  gutterBottom
                >
                  <div className="rainfall-icon"> <img className="rainfall-image-size" src={rainTotal} /> </div>
                  <div className="rainfall-title">Total Rainfall</div>
                  <div className="rainfall" variant="h5" component="h2">
                    <b>{rainfall.at(2)} in</b></div>
                </Typography>


              </CardContent>

            </Card>

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
      </div>
      {loaded && instanceRef.current && (
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
      )}
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

