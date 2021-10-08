import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "./../../services/api";
import Title from "../../components/title";
import { Form, Container } from "./styles/MachineFormStyle";

class Machine extends Component {
  state = {
    type: "",
    implement: "",
    year: "",
    acquisitionDate: "",
    modelmachineId: "",
    models: [],
    error: "",
    message: "",
  };

  componentDidMount() {
    api
      .get("api/modelsmachine/list")
      .then((res) => {
        const models = res.data;
        this.setState({ models });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRegister = async (e) => {
    e.preventDefault();
    const { type, implement, year, acquisitionDate, modelmachineId } =
      this.state;
    if (!type || !implement || !year || !acquisitionDate || !modelmachineId) {
      this.setState({
        error: "Preencha todos os campo para cadastrar uma máquina",
      });
    } else {
      try {
        await api.post("/api/machines/register", {
          type,
          implement,
          year,
          acquisitionDate,
          modelmachineId,
        });
        this.setState({
          message: "Salvo com sucesso",
        });
      } catch (err) {
        this.setState({
          error: "Ocorreu o seguinte problema com o cadastro: " + err,
        });
      }
    }
  };

  render() {
    return (
      <main>
        <Container>
          <Form onSubmit={this.handleRegister}>
            <Title title="Cadastro de máquina" />
            {this.state.message && <p>{this.state.message}</p>}
            {this.state.error && <p>{this.state.error}</p>}

            <label>Tipo de máquina</label>
            <input
              type="text"
              placeholder="Tipo de máquina"
              value={this.state.type}
              onChange={(e) => this.setState({ type: e.target.value })}
            />

            <label>Implemento da máquina</label>
            <input
              type="text"
              placeholder="Implemento da máquina"
              value={this.state.implement}
              onChange={(e) => this.setState({ implement: e.target.value })}
            />

            <label>Ano da máquina</label>
            <input
              type="number"
              placeholder="Ano da máquina"
              value={this.state.year}
              onChange={(e) => this.setState({ year: e.target.value })}
            />

            <label>Data de aquisição</label>
            <input
              type="date"
              placeholder="Data de aquisição"
              value={this.state.acquisitionDate}
              onChange={(e) =>
                this.setState({ acquisitionDate: e.target.value })
              }
            />

            <label>Modelo</label>
            <select
              name="modelmachineId"
              id="modelmachineId"
              value={this.state.modelmachineId}
              onChange={(e) =>
                this.setState({ modelmachineId: e.target.value })
              }
            >
              <option value="0">Selecione um modelo</option>

              {this.state.models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.description}
                </option>
              ))}
            </select>
            <button type="submit">Enviar</button>
          </Form>
        </Container>
      </main>
    );
  }
}

export default withRouter(Machine);
