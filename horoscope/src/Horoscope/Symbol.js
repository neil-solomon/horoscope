import React from "react";

class Symbol extends React.Component {
  state = {
    className: "symbol",
    hover: false,
    hoverOutTimeout: null,
    nameStyle: {
      fontSize: "px"
    },
    symbolStyle: {
      cursor: "pointer",
      marginLeft: "10px",
      marginRight: "10px"
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      if (this.props.active) {
        this.setState({ className: "symbolClick" });
      } else if (this.state.hover) {
        this.setState({ className: "symbolUnclick" });
      } else {
        this.setState({ className: "symbolUnclick" });
        var hoverOutTimeout = setTimeout(
          () => this.setState({ className: "symbolHoverOut" }),
          500
        );
        this.setState({ hoverOutTimeout });
      }
    }
    if (prevProps.symbolSize !== this.props.symbolSize) {
      var nameStyle = {
        fontSize:
          (parseInt(this.props.symbolSize.slice(0, 2)) / 3).toString() + "px"
      };
      this.setState({ nameStyle });
      var symbolStyle = {
        cursor: "pointer",
        marginLeft:
          (parseInt(this.props.symbolSize.slice(0, 2)) / 5).toString() + "px",
        marginRight:
          (parseInt(this.props.symbolSize.slice(0, 2)) / 5).toString() + "px"
      };
      this.setState({ symbolStyle });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.hoverOutTimeout);
  }

  hoverIn = () => {
    this.setState({ hover: true });
    if (this.state.className === "symbolClick") {
      return;
    }
    this.setState({ className: "symbolHoverIn" });
  };

  hoverOut = () => {
    this.setState({ hover: false });
    if (this.state.className === "symbolClick") {
      return;
    }
    this.setState({ className: "symbolHoverOut" });
  };

  onClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    return (
      <div
        className={this.state.className}
        style={this.state.symbolStyle}
        onMouseEnter={this.hoverIn}
        onMouseLeave={this.hoverOut}
        onClick={this.onClick}
      >
        <svg
          style={{
            height: this.props.symbolSize,
            width: this.props.symbolSize
          }}
          viewBox="0 0 64 64"
        >
          <g>
            {this.props.svgPath.map(path => (
              <path d={path} />
            ))}
          </g>
        </svg>
        <br></br>
        <span style={this.state.nameStyle}>{this.props.name}</span>
      </div>
    );
  }
}

export default Symbol;
