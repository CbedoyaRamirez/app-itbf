import { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    ciudad: "",
    numero: "",
    tipoHabitacion: "",
  });

  const [data, setData] = useState([{
    ciudad: "",
    numero: "",
    tipoHabitacion: "",
  }]);

  const ciudades = ["Bogotá", "Medellín", "Cali", "Cartagena"];
  const tiposHabitacion = ["Estándar", "Junior", "Suite"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setData([{
      ciudad: formData.ciudad,
      numero: formData.numero,
      tipoHabitacion: formData.tipoHabitacion,      
    }]);
    console.log(data)
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <div>
            <label htmlFor="ciudad">Ciudad:</label>
            <select
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una ciudad
              </option>
              {ciudades.map((ciudad, index) => (
                <option key={index} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="numero">Número:</label>
            <input
              type="number"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
              placeholder="Ingresa un número"
            />
          </div>

          <div>
            <label htmlFor="tipoHabitacion">Tipo de Habitación:</label>
            <select
              id="tipoHabitacion"
              name="tipoHabitacion"
              value={formData.tipoHabitacion}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona un tipo
              </option>
              {tiposHabitacion.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Enviar</button>
        </div>
      </form>
      <table
      >
        <thead>
          <tr >
            <th>Ciudad</th>
            <th>Número</th>
            <th>Tipo de Habitación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bogotá</td>
            <td>101</td>
            <td>Estándar</td>
          </tr>
          <tr>
            <td>Medellín</td>
            <td>202</td>
            <td>Junior</td>
          </tr>
          <tr>
            <td>Cartagena</td>
            <td>303</td>
            <td>Suite</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default App;
