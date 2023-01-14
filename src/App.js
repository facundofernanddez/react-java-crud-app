import "./App.css";
import { personService } from "./services/PersonService";
import { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.personService = new personService();
  }

  componentDidMount() {
    this.personService
      .getAll()
      .then((data) => this.setState({ personas: data }));
  }

  render() {
    return (
      <DataTable value={this.state.personas}>
        <Column field="id" header="id"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="lastname" header="lastname"></Column>
        <Column field="address" header="address"></Column>
        <Column field="cellphone" header="cellphone"></Column>
      </DataTable>
    );
  }
}
