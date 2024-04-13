import "./App.css";
import ArtistDetail from "./components/ArtistDetail";
import SongDetail from "./components/SongDetail";
import ErrorComponente from "./components/ErrorComponente";
import Form from "./components/Form";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import Endpoint_API from "./helpers/Endpoint_API";
import Conexion from "./helpers/Conexion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import SongTable from "./components/SongTable";
import SongPage from "./pages/SongPage";
function App() {
  let mySongInit = JSON.parse(localStorage.getItem("mySongs")) || [];
  const [search, setSearch] = useState(null),
    [lyric, setLyric] = useState(null),
    [bio, setBio] = useState(null),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(false),
    [mySongs, setMySongs] = useState(mySongInit);
  let song_Parameters = {
      method: "GET",
    },
    account_Parameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${Endpoint_API.CLIEND_ID}&client_secret=${Endpoint_API.CLIENTE_SECRET}`,
    };
  useEffect(() => {
    const request = async () => {
      if (search === null) return;
      await fetch(Endpoint_API.SPOTIFY_COUNT, account_Parameters)
        .then((result) => result.json())
        .then((data) => {
          let artistParameters = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.access_token}`,
            },
          };
          setLoading(true);
          Promise.all([
            Conexion().get({
              link: `${Endpoint_API.LYRICS_API}/${search.artist}/${search.song}`,
              options: song_Parameters,
            }),
            Conexion().get({
              link: `${Endpoint_API.SPOTIFY_ARTIST}?q=${search.artist}&type=artist&limit=1`,
              options: artistParameters,
            }),
          ])
            .then((resultado) => {
              let bool;
              resultado.map((el) => {
                !el.error || el.error === undefined
                  ? (bool = true)
                  : (bool = false);
              });
              if (bool) {
                setLyric(resultado[0]);
                setBio(resultado[1]);
                setError(false);
              } else {
                setError(true);
              }
              setLoading(false);
            })
            .catch(setError(true));
        });
    };
    request();
    localStorage.setItem("mySongs", JSON.stringify(mySongs));
  }, [search, mySongs]);
  const setRequest = (data) => setSearch(data);
  const handleSaveSong = () => {
    let currentSong = {
      search,
      lyric,
      bio,
    };

    setMySongs((mySongs) => [...mySongs, currentSong]);
    setSearch(null);
    alert("Cancionada Guardada en Favoritos");
  };
  const handleDeleteSong = (id) => {
    let isDelete = window.confirm(
      `Estas Seguro de eliminar la cancion con el id : ${id}`
    );
    if (!isDelete) return;
    else {
      let newMySongs = mySongs.filter((el, index) => index !== id);
      setMySongs(newMySongs);
      localStorage.setItem("mySongs", JSON.stringify(mySongs));
    }
  };
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Menu />
          <article className="grid-1-2">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Form
                      setRequest={setRequest}
                      handleSaveSong={handleSaveSong}
                    />
                    <SongTable
                      mySongs={mySongs}
                      handleDeleteSong={handleDeleteSong}
                    />
                    <h2>TABLA DE CANCIONES</h2>
                    {loading && <Loader />}
                    {error && (
                      <ErrorComponente
                        msg={`Error en la conexion o peticion`}
                      />
                    )}
                    {search && !loading && (
                      <>
                        <ArtistDetail bio={bio} />
                        <SongDetail lyric={lyric} />
                      </>
                    )}
                  </>
                }
              />
              <Route
                path="/canciones/:id"
                element={<SongPage mySongs={mySongs} />}
              />
            </Routes>
          </article>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
