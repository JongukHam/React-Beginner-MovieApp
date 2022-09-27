import { useEffect } from "react";
import {useParams} from "react-router-dom";
import { useState } from "react";
import {Link} from "react-router-dom"
import DetailMovie from "../components/DetailMovie";

function Detail(){
    const [loading,setLoading] = useState(true);
    const [movie,setMovie] = useState();
    const { id } = useParams(); //객체로 넘어온 파라미터에서 id만 빼냄 const id 로 사용하면 객체가옴
    
    const getMovie = async () =>{
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    };

    useEffect(()=>{
        getMovie();
    },[]);
    
    return (
        <div>
        {loading ? (<h1>Loading...</h1>) : (
          <div>
            <DetailMovie 
            key={movie.id}
            id={movie.id}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            summary={movie.description_full}
            genres={movie.genres}
            />
            <Link to="/">Home</Link>
          </div>)
          }
      </div>
    )
}

export default Detail;

