import "./App.css";
import { personService } from "./services/PersonService";
import { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          alert("updated!");
        },
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          alert("erased!");
        },
      },
    ];
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    this.personService = new personService();
  }

  componentDidMount() {
    this.personService
      .getAll()
      .then((data) => this.setState({ persons: data }));
    this.setState({
      visible: false,
      person: {
        id: null,
        name: null,
        lastname: null,
        address: null,
        cellphone: null,
      },
    });
  }

  save() {
    this.personService.save(this.state.person).then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <Menubar model={this.items} />
        <br />
        <DataTable value={this.state.persons}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="lastname" header="Lastname"></Column>
          <Column field="address" header="Address"></Column>
          <Column field="cellphone" header="Cellphone"></Column>
        </DataTable>
        <Dialog
          header="Crear persona"
          visible={this.state.visible}
          style={{ width: "50vw" }}
          modal={true}
          footer={this.footer}
          onHide={() => this.setState({ visible: false })}
        >
          <span className="p-float-label">
            <InputText
              value={this.state.value}
              id="nombre"
              onChange={(e) =>
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.name = e.target.value;

                  return { person };
                })
              }
            />
            <label htmlFor="nombre">Nombre</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              value={this.state.value}
              id="lastname"
              onChange={(e) =>
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.lastname = e.target.value;

                  return { person };
                })
              }
            />
            <label htmlFor="lastname">Apellido</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              value={this.state.value}
              id="address"
              onChange={(e) =>
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.address = e.target.value;

                  return { person };
                })
              }
            />
            <label htmlFor="address">Direccion</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              value={this.state.value}
              id="cellphone"
              onChange={(e) =>
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.cellphone = e.target.value;

                  return { person };
                })
              }
            />
            <label htmlFor="cellphone">Telefono</label>
          </span>
        </Dialog>
      </div>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
    });
  }
}
