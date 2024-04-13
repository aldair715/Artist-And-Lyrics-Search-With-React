import PropTypes from "prop-types";
import { useNavigate } from "react-router";
const SongTableRow = ({ el, id, handleDeleteSong }) => {
  let { bio, lyric } = el;
  const artista_info = bio.artists.items[0];
  const { title } = lyric;
  let avatarStyles = {
    width: "auto",
    height: "40px",
  };
  const { name, images } = artista_info;
  let avatar = images[0].url;
  let navigate = useNavigate();
  return (
    <tr>
      <td>
        <img style={avatarStyles} src={avatar} alt={name} />
      </td>
      <td>{name}</td>
      <td>{title}</td>
      <td>
        <button onClick={() => navigate(`/canciones/${id}`)}>VER</button>
        <button onClick={() => handleDeleteSong(id)}>ELIMINAR</button>
      </td>
    </tr>
  );
};
SongTableRow.propTypes = {
  el: PropTypes.any,
  id: PropTypes.any,
  handleDeleteSong: PropTypes.func,
};
export default SongTableRow;
