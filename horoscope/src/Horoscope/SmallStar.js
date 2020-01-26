import React from "react";

class SmallStar extends React.Component {
  state = { className: "smallStar", resetClassNameTimeout: null };

  componentWillUnmount() {
    clearTimeout(this.state.resetClassNameTimeout);
  }

  onHover = () => {
    if (this.state.className === "smallStarGlow") {
      return;
    }
    this.setState({ className: "smallStarGlow" });
    var resetClassNameTimeout = setTimeout(() => this.resetClassName(), 2000);
    this.setState({ resetClassNameTimeout });
  };

  resetClassName = () => {
    this.setState({ className: "smallStar" });
  };

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: this.props.style.top,
          left: this.props.style.left,
          width: "20px",
          height: "20px"
        }}
        onMouseEnter={this.onHover}
      >
        <div
          style={{ opacity: this.props.style.opacity }}
          className={this.state.className}
        ></div>
      </div>
    );
  }
}

export default SmallStar;
