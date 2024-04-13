import { useParams } from "react-router";
import PropTypes from "prop-types";
import SongDetail from "../components/SongDetail";
import ArtistDetail from "../components/ArtistDetail";
const SongPage = ({ mySongs }) => {
  let { id } = useParams();
  let currentSong = mySongs[id];
  console.log(currentSong);
  let { bio, lyric } = currentSong;
  return (
    <>
      <ArtistDetail bio={bio} />
      <SongDetail lyric={lyric} />
    </>
  );
};
SongPage.propTypes = {
  mySongs: PropTypes.any,
};
export default SongPage;
