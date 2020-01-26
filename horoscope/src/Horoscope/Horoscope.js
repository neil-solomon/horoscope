import React from "react";
import { Icon } from "antd";
import "./Horoscope.css";
import SmallStar from "./SmallStar.js";
import Symbol from "./Symbol.js";
import ConstellationStars from "./ConstellationStars.js";

class NightSky extends React.Component {
  state = {
    windowIsLandscape: true,
    symbolSize: "",
    messageFontSize: "",
    numShineStars: 10,
    shineStarStyles: [],
    numSmallStars: 1000,
    smallStarStyles: [],
    smallStarStylesGE: [],
    symbols: [],
    activeSymbol: null,
    horoscopeMessages: [],
    activeHoroscopeMessage: "",
    horoscopeMessageClassName: "horoscopeMessageIn",
    horoscopeMessageTimeout: null,
    horoscopeMessageAnimating: false
  };

  componentDidMount() {
    var symbols = require("./symbols.json").symbols;
    this.setState({ symbols });
    var horoscopeMessages = require("./horoscopes.json").horoscopes;
    this.setState({ horoscopeMessages });
    this.makeAllStars();
    window.addEventListener("resize", this.windowResize);
    this.setState({
      windowIsLandscape: window.innerHeight < window.innerWidth
    });
    this.setState({ symbolSize: (window.innerWidth / 22).toString() + "px" });
    this.setState({
      messageFontSize: (window.innerWidth / 50).toString() + "px"
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.windowResize);
    clearTimeout(this.state.horoscopeMessageTimeout);
  }

  windowResize = () => {
    this.setState({
      windowIsLandscape: window.innerHeight < window.innerWidth
    });
    this.setState({ symbolSize: (window.innerWidth / 22).toString() + "px" });
    this.setState({
      messageFontSize: (window.innerWidth / 50).toString() + "px"
    });
    this.makeAllStars();
  };

  makeAllStars = () => {
    this.makeSmallStars();
    // this.makeSmallStarsGalacticEye();
    // this.makeShineStars();
  };

  makeSmallStars = () => {
    var smallStarStyles = [];
    for (let i = 0; i < this.state.numSmallStars; ++i) {
      var random1 =
        Math.round((Math.random() * 1000000) % (window.innerHeight - 40)) + 20;
      var random2 =
        Math.round((Math.random() * 1000000) % (window.innerWidth - 40)) + 20;
      var style = {
        top: random1.toString() + "px",
        left: random2.toString() + "px",
        opacity:
          1 -
          (0.75 * Math.abs(0.3 * window.innerHeight - random1)) /
            window.innerHeight
      };
      smallStarStyles.push(style);
    }
    this.setState({ smallStarStyles });
  };

  makeSmallStarsGalacticEye = () => {
    var smallStarStylesGE = [];
    for (let i = 0; i < this.state.numSmallStars; ++i) {
      var random1 =
        Math.round(((Math.random() * 1000000) % window.innerHeight) / 4) +
        (1 / 5) * window.innerHeight;
      var random2 =
        Math.round((Math.random() * 1000000) % (window.innerWidth - 40)) + 20;
      var style = {
        top: random1.toString() + "px",
        left: random2.toString() + "px",
        opacity:
          1 -
          (3 * Math.abs(0.3 * window.innerHeight - random1)) /
            window.innerHeight
      };
      smallStarStylesGE.push(style);
    }
    this.setState({ smallStarStylesGE });
  };

  makeShineStars = () => {
    var shineStarStyles = [];
    for (let i = 0; i < this.state.numSmallStars; ++i) {
      var random1 =
        Math.round(((Math.random() * 1000000) % window.innerHeight) / 4) +
        0.5 * window.innerHeight;
      var random2 = Math.round((Math.random() * 1000000) % window.innerWidth);
      var style = {
        top: random1.toString() + "px",
        left: random2.toString() + "px"
      };
      shineStarStyles.push(style);
    }
    this.setState({ shineStarStyles });
  };

  symbolClick = id => {
    if (this.state.horoscopeMessageAnimating) {
      return;
    }
    var symbols = [...this.state.symbols];
    var activeSymbol;
    if (symbols[id].active) {
      symbols[id].active = false;
      symbols[id].starClassName = "constellationOff";
      activeSymbol = null;
    } else {
      for (let i = 0; i < symbols.length; ++i) {
        if (i === id) {
          symbols[i].active = true;
          activeSymbol = i;
          symbols[i].starClassName = "constellationOn";
          var horoscopeMessageTimeout = setTimeout(
            () => this.updateHoroscopeMessage(i),
            1000
          );
        } else {
          if (symbols[i].active) {
            symbols[i].starClassName = "constellationOff";
          } else {
            symbols[i].starClassName = "constellation";
          }
          symbols[i].active = false;
        }
      }
    }
    this.setState({ activeSymbol });
    this.setState({ horoscopeMessageTimeout });
    this.setState({ horoscopeMessageClassName: "horoscopeMessageOut" });
    this.setState({ symbols });
  };

  updateHoroscopeMessage = horoscopeIx => {
    this.setState({
      activeHoroscopeMessage: this.state.horoscopeMessages[
        this.state.symbols[horoscopeIx].name
      ]
    });
    this.setState({ horoscopeMessageAnimating: false });
    this.setState({ horoscopeMessageClassName: "horoscopeMessageIn" });
  };

  render() {
    console.log(this.state.windowIsLandscape);
    if (!this.state.windowIsLandscape) {
      return (
        <div
          style={{
            backgroundColor: "rgb(0,0,25)",
            height: "100vh",
            width: "100vw"
          }}
        >
          <div className="rotateDeviceContainer">
            <div style={{ height: "30vh" }}></div>
            <div
              className="rotateDevice"
              style={{ fontSize: "60px", color: "rgb(255,255,255,.75)" }}
            >
              <Icon type="tablet"></Icon>
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "rgb(255,255,255,.75)",
                textAlign: "center"
              }}
            >
              Rotate Device
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mainContainer">
        <div className="contentContainer">
          <div className="symbols">
            {this.state.symbols.map((symbol, index) => (
              <Symbol
                key={"symbol" + index}
                id={index}
                name={symbol.name}
                svgPath={symbol.svgPath}
                symbolSize={this.state.symbolSize}
                active={symbol.active}
                onClick={this.symbolClick}
              ></Symbol>
            ))}
          </div>
          <ConstellationStars
            activeSymbol={this.state.activeSymbol}
          ></ConstellationStars>
          <div className="galaxy">
            <div className="fadeLeft"></div>
            <div className="fadeRight"></div>
            {/* <div className="galacticCore"></div> */}
            {this.state.smallStarStyles.map((smallStarStyle, index) => (
              <SmallStar
                key={"smallStar" + index}
                style={smallStarStyle}
              ></SmallStar>
            ))}
            {/* {this.state.smallStarStylesGE.map((smallStarStyleGE, index) => (
            <SmallStar
              key={"smallStarGE" + index}
              style={smallStarStyleGE}
            ></SmallStar>
          ))} */}
            {/* {this.state.symbols.map(symbol =>
            symbol.stars.map((star, index) => (
              <div
                key={symbol.name + "Star" + index}
                className={symbol.starClassName}
                style={star}
              ></div>
            ))
          )} */}
            {/* {this.state.shineStarStyles.map((shineStarStyle, index) => (
            <div
              key={"shineStar" + index}
              className={"shineStar" + (index + 1).toString()}
              style={shineStarStyle}
            ></div>
          ))} */}
          </div>
          <div
            style={{ fontSize: this.state.messageFontSize }}
            className={this.state.horoscopeMessageClassName}
            key={this.state.activeHoroscopeMessage}
          >
            {this.state.activeHoroscopeMessage}
          </div>
          <div
            className="footer"
            style={{
              fontSize:
                (
                  parseInt(this.state.messageFontSize.slice(0, 2)) / 1.5
                ).toString() + "px"
            }}
          >
            <a href="https://www.horoscope.com/" target="blank">
              Horoscopes by Horoscope.com
            </a>
            <br></br>
            <a href="https://www.flaticon.com/authors/bqlqn" target="blank">
              Icons by BQLQN
            </a>
            <br></br>
            <a href="http://www.neilsolomon.net" target="blank">
              &copy;2020 Neil Solomon
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NightSky;
