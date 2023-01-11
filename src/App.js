import "./App.css";
import { personService } from "./services/PersonService";
import { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.personService = new personService();
  }

  componentDidMount() {
    this.personService.getAll().then((data) => {
      console.log(data);
    });
  }

  render() {
    return <h1>Hola mundo</h1>;
  }
}
