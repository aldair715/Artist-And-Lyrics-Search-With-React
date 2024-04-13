import PropTypes from "prop-types";
import { useState } from "react";
const initialForm = {
  artist: "",
  song: "",
};
const Form = ({ setRequest, handleSaveSong }) => {
  const [form, setForm] = useState(initialForm);
  const [isDisabled, setIsDisabled] = useState(true);
  const handleChange = (e) => {
      e.preventDefault();
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    handleSubmit = (e) => {
      e.preventDefault();
      if (!form.artist || !form.song) {
        alert("datos incompletos");
        setIsDisabled(true);
        return;
      }
      setRequest(form);
      setForm(initialForm);
      setIsDisabled(false);
    };
  return (
    <>
      <form id="song-search" onSubmit={handleSubmit}>
        <br />
        <input
          type="text"
          name="artist"
          placeholder="Nombre del Artista"
          onChange={handleChange}
          value={form.artist ? form.artist : ""}
        />
        <br />
        <input
          type="text"
          name="song"
          placeholder="Nombre de la Cancion"
          onChange={handleChange}
          value={form.song ? form.song : ""}
        />
        <br />
        <input type="submit" value="Enviar" />
        <input
          type="button"
          onClick={handleSaveSong}
          value="AGREGAR CANCION"
          disabled={isDisabled ? true : false}
        />
      </form>
    </>
  );
};
Form.propTypes = {
  setRequest: PropTypes.any,
  handleSaveSong: PropTypes.func,
};
export default Form;
