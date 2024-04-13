import PropTypes from "prop-types";
import SongTableRow from "./SongTableRow";
const SongTable = ({ mySongs, handleDeleteSong }) => {
  return (
    <>
      <h3>MIS CANCIONES FAVORITAS</h3>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Artista</th>
            <th>CANCION</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {mySongs.length > 0 ? (
            mySongs.map((el, index) => (
              <SongTableRow
                key={index}
                el={el}
                id={index}
                handleDeleteSong={handleDeleteSong}
              />
            ))
          ) : (
            <tr>
              <td colSpan={"4"}>SIN CANCIONES FAVORITAS</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
SongTable.propTypes = {
  mySongs: PropTypes.any,
  handleDeleteSong: PropTypes.any,
};
export default SongTable;
