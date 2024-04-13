import PropTypes from "prop-types";
import ErrorComponente from "./ErrorComponente";
const ArtistDetail = ({ bio }) => {
  if (!bio) return null;
  const artista_API_info = bio.artists.items[0];
  const { name, images, genres, followers, external_urls } = artista_API_info;
  let avatar = images[0].url;
  return (
    <div className="artist">
      {artista_API_info.length === 0 ||
      artista_API_info.error === true ||
      artista_API_info === undefined ? (
        <ErrorComponente message={`ERROR ARTISTA NO EXISTENTE`} />
      ) : (
        <>
          <h1>ARTISTA</h1>
          <h2>{name}</h2>
          <img alt={name} src={avatar} />
          <p>GENEROS: {genres.join(",")}</p>
          <p>FOLLOWERS: {followers.total}</p>
          <a href={external_urls.spotify}>
            <img src="/src/assets/spotify(1).png" alt="spotify" />
          </a>
        </>
      )}
    </div>
  );
};
ArtistDetail.propTypes = {
  bio: PropTypes.any,
};
export default ArtistDetail;
