import React from "react";
import gsap from "gsap";

class ConstellationStars extends React.Component {
  divStyle = {
    position: "absolute",
    width: "100vw",
    height: "100vh"
  };

  starStyle = {
    position: "absolute",
    backgroundColor: "rgb(200,200,255)",
    opacity: 0,
    height: "5px",
    width: "5px",
    boxShadow: "0px 0px 7.5px rgb(200,200,255)",
    borderRadius: "50%",
    top: "40vh",
    left: "50vw"
  };

  componentDidUpdate(prevProps) {
    if (prevProps.activeSymbol !== this.props.activeSymbol) {
      this.animateStars();
    }
  }

  animateStars = () => {
    switch (this.props.activeSymbol) {
      case null:
        this.starsToNull(1);
        break;
      case 0:
        this.starsToAries();
        break;
      case 1:
        this.starsToTaurus();
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        break;
      case 10:
        break;
      case 11:
        break;
    }
  };

  starsToNull = start => {
    for (let i = start; i <= 22; ++i) {
      gsap.to(".constellationStar" + i.toString(), {
        duration: 1,
        top: "40vh",
        left: "50vw",
        opacity: 0
      });
    }
  };

  starsToAries = () => {
    var delay = "-=1.75";
    var tl = gsap.timeline({ defaults: { duration: 2, ease: "sine" } });
    tl.to(".constellationStar1", { top: "32vh", left: "35vw", opacity: 1 })
      .to(
        ".constellationStar2",
        { top: "34vh", left: "55vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar3",
        { top: "36vh", left: "65vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar4",
        { top: "38vh", left: "67vw", opacity: 1 },
        delay
      );
    this.starsToNull(5);
  };

  starsToTaurus = () => {
    var delay = "-=1.9";
    var tl = gsap.timeline({ defaults: { duration: 2, ease: "sine" } });
    tl.to(".constellationStar1", { top: "24vh", left: "45vw", opacity: 1 })
      .to(
        ".constellationStar2",
        { top: "29vh", left: "40vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar3",
        { top: "32vh", left: "47.5vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar4",
        { top: "38vh", left: "48.5vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar5",
        { top: "40vh", left: "49vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar6",
        { top: "42vh", left: "49.5vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar7",
        { top: "39vh", left: "47.5vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar8",
        { top: "41vh", left: "48.5vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar9",
        { top: "46vh", left: "52vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar10",
        { top: "51vh", left: "57vw", opacity: 1 },
        delay
      )
      .to(
        ".constellationStar11",
        { top: "52vh", left: "57.5vw", opacity: 1 },
        delay
      );
    this.starsToNull(12);
  };

  render() {
    return (
      <div style={this.divStyle}>
        <div className="constellationStar1" style={this.starStyle}></div>
        <div className="constellationStar2" style={this.starStyle}></div>
        <div className="constellationStar3" style={this.starStyle}></div>
        <div className="constellationStar4" style={this.starStyle}></div>
        <div className="constellationStar5" style={this.starStyle}></div>
        <div className="constellationStar6" style={this.starStyle}></div>
        <div className="constellationStar7" style={this.starStyle}></div>
        <div className="constellationStar8" style={this.starStyle}></div>
        <div className="constellationStar9" style={this.starStyle}></div>
        <div className="constellationStar10" style={this.starStyle}></div>
        <div className="constellationStar11" style={this.starStyle}></div>
        <div className="constellationStar12" style={this.starStyle}></div>
        <div className="constellationStar13" style={this.starStyle}></div>
        <div className="constellationStar14" style={this.starStyle}></div>
        <div className="constellationStar15" style={this.starStyle}></div>
        <div className="constellationStar16" style={this.starStyle}></div>
        <div className="constellationStar17" style={this.starStyle}></div>
        <div className="constellationStar18" style={this.starStyle}></div>
        <div className="constellationStar19" style={this.starStyle}></div>
        <div className="constellationStar20" style={this.starStyle}></div>
        <div className="constellationStar21" style={this.starStyle}></div>
        <div className="constellationStar22" style={this.starStyle}></div>
      </div>
    );
  }
}

export default ConstellationStars;
