import Row from "../components/Row";
import requests from "../Requests";

const MoviesRows = () => {
    return (
    <>
        <Row rowId="1" title="Trending Movies" fetchURL={requests.fetchTrending} />
        <Row rowId="2" title="Top Rated Movies" fetchURL={requests.fetchTopRated} />
        <Row rowId="3" title="Action Movies" fetchURL={requests.fetchActionMovies}/>
        <Row rowId="4" title="Comedy Movies" fetchURL={requests.fetchComedyMovies}/>
        <Row rowId="5" title="Horror Movies" fetchURL={requests.fetchHorrorMovies}/>
        <Row rowId="6" title="Romance Movies" fetchURL={requests.fetchRomanceMovies}/>
        <Row rowId="7" title="Popular Movies" fetchURL={requests.requestPopular}/>
        <Row rowId="8" title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals}/>
        <Row rowId="9" title="Netflix Documentaries" fetchURL={requests.fetchDocumentaries}/>
    </>
    )
}

export default MoviesRows