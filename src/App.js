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
import { Toast } from "primereact/toast";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      person: {
        id: null,
        name: "",
        lastname: "",
        address: "",
        cellphone: "",
      },
      selectedPerson: {},
    };
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
          this.showEditDialog();
        },
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-trash",
        command: () => {
          this.delete();
        },
      },
    ];
    this.personService = new personService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount() {
    this.personService
      .getAll()
      .then((data) => this.setState({ persons: data }));
  }

  save() {
    this.personService.save(this.state.person).then((data) => {
      this.setState({
        visible: false,
        person: {
          id: null,
          name: "",
          lastname: "",
          address: "",
          cellphone: "",
        },
      });
      this.toast.show({
        severity: "success",
        summary: "Atención!",
        detail: "Se guardó el registro correctamente",
      });
      this.personService
        .getAll()
        .then((data) => this.setState({ persons: data }));
    });
  }

  delete() {
    if (window.confirm("¿Realmente desea eliminar el registro?")) {
      this.personService.delete(this.state.selectedPerson.id).then((data) => {
        this.toast.show({
          severity: "success",
          summary: "Atención!",
          detail: "Se eliminó el registro correctamente",
        });
        this.personService
          .getAll()
          .then((data) => this.setState({ persons: data }));
      });
    }
  }

  render() {
    return (
      <div>
        <Menubar model={this.items} />
        <br />
        <DataTable
          value={this.state.persons}
          rows="4"
          paginator
          selectionMode="single"
          selection={this.state.selectedPerson}
          onSelectionChange={(e) => this.setState({ selectedPerson: e.value })}
        >
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
              value={this.state.person.name}
              id="nombre"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.name = val;

                  return { person };
                });
              }}
            />
            <label htmlFor="nombre">Nombre</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              value={this.state.person.lastname}
              id="lastname"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.lastname = val;

                  return { person };
                });
              }}
            />
            <label htmlFor="lastname">Apellido</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              value={this.state.person.address}
              id="address"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.address = val;

                  return { person };
                });
              }}
            />
            <label htmlFor="address">Direccion</label>
          </span>
          <br />
          <span className="p-float-label">
            <InputText
              value={this.state.person.cellphone}
              id="cellphone"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let person = Object.assign({}, prevState.person);
                  person.cellphone = val;

                  return { person };
                });
              }}
            />
            <label htmlFor="cellphone">Telefono</label>
          </span>
        </Dialog>
        <Toast ref={(e) => (this.toast = e)} />
      </div>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      person: {
        id: null,
        name: "",
        lastname: "",
        address: "",
        cellphone: "",
      },
    });
  }

  showEditDialog() {
    this.setState({
      visible: true,
      person: {
        id: this.state.selectedPerson.id,
        name: this.state.selectedPerson.name,
        lastname: this.state.selectedPerson.lastname,
        address: this.state.selectedPerson.address,
        cellphone: this.state.selectedPerson.cellphone,
      },
    });
  }
}
