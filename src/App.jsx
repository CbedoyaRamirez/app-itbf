import { useState } from "react";
import "./App.css";

const App = () => {
  const [hoteles, setHoteles] = useState([]);
  const [hotel, setHotel] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    NIT: 0,
    numHabitaciones: 0,
    tipoHabitacion: "",
    acomodacion: "",
  });

  const acomodaciones = {
    Estándar: ["Sencilla", "Doble"],
    Junior: ["Triple", "Cuádruple"],
    Suite: ["Sencilla", "Doble", "Triple"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/hoteles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          "nombre" : hotel.nombre,
          "numPersonas" : hotel.numPersonas,
          "idAcomodacion" : hotel.idAcomodacion,
          "direccion": hotel.direccion,
          "telefono" : hotel.telefono
        }
      });

      const data = await response.json();
      if (data.success) {
        alert('Hotel registrado con éxito');
        setHoteles([...hoteles, hotel]); 
        setHotel({
          nombre: '',
          direccion: '',
          telefono: '',
          ruc: '',
          tipoHabitacion: '',
          acomodacion: '',
        }); 
      } else {
        alert('Error al registrar el hotel.');
      }
    } catch (error) {
      alert('Error en la conexión con el servidor.');
      console.error(error);
    }

    setHoteles([...hoteles, hotel]);
    setHotel({
      nombre: "",
      direccion: "",
      telefono: "",
      NIT: 0,
      numHabitaciones: 0,
      tipoHabitacion: "",
      acomodacion: "",
    });
  };

  return (
    <div className="hotel-form-container">
      <h2>Registro de Hoteles</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Hotel:
          <input
            type="text"
            name="nombre"
            value={hotel.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={hotel.direccion}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            name="telefono"
            value={hotel.telefono}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          NIT:
          <input
            type="number"
            name="NIT"
            value={hotel.NIT}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Numero de habitaciones:
          <input
            type="number"
            name="numHabitaciones"
            value={hotel.numHabitaciones}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Tipo de Habitación:
          <select
            name="tipoHabitacion"
            value={hotel.tipoHabitacion}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Estándar">Estándar</option>
            <option value="Junior">Junior</option>
            <option value="Suite">Suite</option>
          </select>
        </label>
        <label>
          Acomodación:
          <select
            name="acomodacion"
            value={hotel.acomodacion}
            onChange={handleChange}
            required
            disabled={!hotel.tipoHabitacion}
          >
            <option value="">Seleccionar</option>
            {hotel.tipoHabitacion &&
              acomodaciones[hotel.tipoHabitacion].map((acom) => (
                <option key={acom} value={acom}>
                  {acom}
                </option>
              ))}
          </select>
        </label>
        <button type="submit">Registrar Hotel</button>
      </form>
      {hoteles.length > 0 && (
        <div className="hotel-list">
          <h3>Lista de Hoteles Registrados</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>NIT</th>
                <th>Numero de habitaciones</th>
                <th>Tipo de Habitación</th>
                <th>Acomodación</th>
              </tr>
            </thead>
            <tbody>
              {hoteles.map((hotel, index) => (
                <tr key={index}>
                  <td>{hotel.nombre}</td>
                  <td>{hotel.direccion}</td>
                  <td>{hotel.telefono}</td>
                  <td>{hotel.NIT}</td>
                  <td>{hotel.numHabitaciones}</td>
                  <td>{hotel.tipoHabitacion}</td>
                  <td>{hotel.acomodacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
