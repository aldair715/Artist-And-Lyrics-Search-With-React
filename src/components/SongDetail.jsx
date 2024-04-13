import PropTypes from "prop-types";
import ErrorComponente from "./ErrorComponente";
const SongDetail = ({ lyric }) => {
  if (!lyric) return null;
  const { title, lyrics } = lyric;
  return (
    <div>
      {lyric.error === true ||
      Object.keys(lyric).length === 0 ||
      typeof lyric !== "object" ? (
        <ErrorComponente message={`Error no existe la cancion`} />
      ) : (
        <>
          <div>
            <h1>CANCION</h1>
            <h3>{title}</h3>
            <blockquote style={{ whiteSpace: "pre-wrap" }}>{lyrics}</blockquote>
          </div>
        </>
      )}
    </div>
  );
};
SongDetail.propTypes = {
  lyric: PropTypes.any,
};
export default SongDetail;
