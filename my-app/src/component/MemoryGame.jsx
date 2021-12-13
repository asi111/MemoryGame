import React, { Component } from "react";
import "./MemoryGame.css";

export default class MemoryGame extends Component {
  state = {
    arrayNumber: [],
    // moveCounter: null,
    timer: 0,
    turns: 0,
    gameOver: false,
    table: [],
  };

  imagGallery = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUsJzPlGa7ztjXNgzmw0f_5iVpnf5esyaxHQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSleDF4wECQHT3tnYYZUkaFa9avVW-yBlHqVA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO91VZLLQ0SM1GSJMqX4tyUpQSr414f61xFg&usqp=CAU",
  ];
  arrayLength = 6;
  // counter = 0;
  intervalID = null;
  lastClicked = null;
  matched = null;

  componentDidMount() {
    this.board();
  }

  board = () => {
    let temp = [...this.state.arrayNumber];
    console.log(temp);
    //   const CouplesArray = []
    for (let i = 0; i < this.arrayLength / 2; i++) {
      temp.push({
        src: this.imagGallery[i],
        clicked: false,
        success: false,
        id: i,
      });
    }
    for (let i = 0; i < this.arrayLength / 2; i++) {
      temp.push({
        src: this.imagGallery[i],
        clicked: false,
        success: false,
        id: i,
      });
    }
    temp.sort(() => Math.random() - 0.5);
    this.setState({ arrayNumber: temp });
  };

  clickHandler = (i) => {
    this.setState({ turns: this.state.turns + 1 });
    const temp = [...this.state.arrayNumber];
    this.matched = temp[i].id;

    if (this.lastClicked !== null) {
      if (this.matched === temp[this.lastClicked].id) {
        temp[i].success = true;
        temp[this.lastClicked].success = true;
        if (
          temp[0].success &&
          temp[1].success &&
          temp[2].success &&
          temp[3].success &&
          temp[4].success &&
          temp[5].success
        ) {
          this.state.gameOver = true;
          this.localStorageData();
          clearInterval(this.intervalID);
        }
      }

      temp[i].clicked = false;
      temp[this.lastClicked].clicked = false;
      this.lastClicked = null;

      console.log(this.lastClicked);
    } else {
      temp[i].clicked = true;
      this.lastClicked = Number(i);
    }

    this.setState({ arrayNumber: temp });
    console.log(temp[i]);
  };

  checkIsClicked = (i, item) => {
    if (!(item.success || item.clicked)) {
      this.clickHandler(i);
    }
  };

  startCount = () => {
    this.intervalID = setInterval(
      () =>
        this.setState({
          timer: this.state.timer + 1,
        }),
      1000
    );
  };

  newGAme = () => {
    const temp = [...this.state.arrayNumber];
    temp.map((item) => {
      item.clicked = false;
      item.success = false;
    });
    this.setState({ timer: 0,
      //  moveCounter: null,
       turns: 0, 
      gameOver: false ,
      table : []
    });
  };

  localStorageData = () => {
    // localStorage.setItem("counters" , JSON.stringify([]))

    const countersJson = localStorage.getItem("counter");
    console.log(countersJson);

    let counters = JSON.parse(countersJson);
    console.log(counters);
    counters.push(this.state.timer , this.state.turns);
    console.log(counters);
    localStorage.setItem("counter", JSON.stringify(counters));
    this.setState({ table: counters });
  };

  render() {
    const gameOver = {
      display: this.state.gameOver ? "block" : "none",
    };
    const { arrayNumber, timer, turns, table } = this.state;
    const showHistory = table.map((item,i) => <p key={i}>{item}</p>);
    const newArray = arrayNumber.map((item, i) => {
      return (
        <div key={i}>
          <div className="card" onClick={() => this.checkIsClicked(i, item)}>
            <div>
              {" "}
              <img src={item.success || item.clicked ? item.src : null} />
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="cardContainer">
        {<button onClick={this.startCount}>start game</button>}
        <br />
        {<button onClick={this.newGAme}>new game</button>}
        <br />
        <p>It took : {timer} seconds</p>
        <p> {turns} turns</p>
        {newArray}
        <p className="gameOverText" style={gameOver}>
          game over
        </p>
        <p>score table : {showHistory}</p>
      </div>
    );
  }
}
