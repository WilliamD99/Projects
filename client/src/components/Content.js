import React, { Component } from "react";
import Trending from "./Trending";
import MenuLeft from "./MenuLeft";
import trending from "../helpers/trending";
import chunk from "../helpers/sliceData";
import { Link } from "react-router-dom";
import Developers from "./Developers";
import { Switch, Route } from "react-router-dom";

export default class Content extends Component {
  state = {
    frequent: "daily",
    language: "",
    page: 0,
    page_max: 0
  };
  //Init page buttons
  pageNum = num => {
    let numberOfPage = [];
    let url = window.location.href;
    for (let i = 1; i <= num; i++) {
      let page = (
        <Link
          to={`/page-${i}`}
          className="page-link pagination"
          id="pagination"
          onClick={this.handlePage}
          key={i}
        >
          {i}
        </Link>
      );
      numberOfPage.push(page);
    }
    return numberOfPage;
  };
  //Init language selections
  langArr = () => {
    let arr = [
      "Javascript",
      "Java",
      "C",
      "C#",
      "C++",
      "Python",
      "Swift",
      "Rust",
      "Go",
      "React",
      "Vue"
    ];
    let options = arr.map((lang, index) => <option key={index}>{lang}</option>);
    return options;
  };
  //Handle change event function
  handleChange = event => {
    event.preventDefault();
    const target = event.target;
    if (target.value === "None") {
      this.setState({
        [target.name]: ""
      });
    } else {
      this.setState({
        [target.name]: target.value.toLowerCase()
      });
    }
  };
  //Handle page
  handlePage = event => {
    const target = event.target;
    if (target.classList.value.indexOf("pagination") === -1) {
      target.classList.add("pagination");
    } else {
      target.classList.remove("pagination");
    }
    this.setState({
      page: parseInt(target.innerHTML) - 1
    });
  };
  processData = obj => {
    let data = obj.data;
    let dataSliced = chunk(data, 10);
    this.setState({
      trending: dataSliced,
      page_max: dataSliced.length
    });
  };
  async componentDidMount() {
    let dataObject = await trending.get(
      `repositories?since=${this.state.frequent}`
    );
    this.processData(dataObject);
  }
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.language !== prevState.language ||
      this.state.frequent !== prevState.frequent
    ) {
      let dataObject = await trending.get(
        `repositories?language=${this.state.language}&since=${this.state.frequent}`
      );
      let data = dataObject.data;
      let dataSliced = chunk(data, 10);
      this.setState({
        trending: dataSliced,
        page_max: dataSliced.length
      });
    }
  }
  render() {
    if (this.state.trending === undefined) {
      return <h1>Loading</h1>;
    } else {
      return (
        <>
          <MenuLeft />
          <Developers />
          <ul className="nav justify-content-center" id="menu">
            <li className="nav-item">
              <div className="form-group">
                <select
                  className="form-control"
                  name="frequent"
                  onChange={this.handleChange}
                >
                  <option>Frequent</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </li>
            <li className="nav-item">
              <div className="form-group">
                <select
                  className="form-control"
                  name="language"
                  onChange={this.handleChange}
                >
                  <option>None</option>
                  {this.langArr()}
                </select>
              </div>
            </li>
            <li className="nav-item">
              <p className="nav-link">Link</p>
            </li>
          </ul>
          <Switch>
            <Route
              path="/"
              render={() => (
                <Trending data={this.state.trending[this.state.page]} />
              )}
            ></Route>
          </Switch>
          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {this.pageNum(this.state.page_max)}
              <li className="page-item">
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </>
      );
    }
  }
}