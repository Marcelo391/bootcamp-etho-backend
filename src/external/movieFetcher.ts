import { Request, Response } from "express";
import fs from 'fs';
import axios from "axios";

const URL_MOVIES = 'https://api.themoviedb.org/3/trending/all/week?api_key=8c9751844a68e8e7105d68bd90f6eb25';
const URL_CATEGORY_MOVIES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=8c9751844a68e8e7105d68bd90f6eb25&language=en-US';

const URL_CATEGORY_TV = 'https://api.themoviedb.org/3/genre/tv/list?api_key=8c9751844a68e8e7105d68bd90f6eb25&language=en-US';

const URL_IMAGES = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

async function movieFetcher(req: Request, res: Response){
    
    const getMovies = await axios(URL_MOVIES);
    const moviesList = getMovies.data.results;
    
    const getCategoriesMovie = await axios(URL_CATEGORY_MOVIES);
    const catsListMovie = getCategoriesMovie.data.genres;

    const getCategoriesTv = await axios(URL_CATEGORY_TV);
    const catsListTv = getCategoriesTv.data.genres;

    const moviesArray: Object[] = []

    moviesList.map( (obj: any) => {    
       
        const movieObj = {
            name: undefined,
            category: obj.genre_ids,
            description: obj.overview,
            media_type: obj.media_type,
            poster: URL_IMAGES + obj.poster_path,
            backdrop: URL_IMAGES +obj.backdrop_path
        }

        if( obj.media_type === "movie"){
            movieObj.name = obj.title;
        }
        else{
            movieObj.name = obj.name;
        }

        moviesArray.push(movieObj)
    });

    // Passando categorias para objetos do tipo filme
    moviesArray.map( (movie: any, movieIndex: any) => {
        catsListMovie.find( (cat: any, catIndex: any) => {
            if( movie.media_type as string === "movie" &&  cat.id === movie.category[0] ){              
                movie.category = cat.name;
            }
        });
    });

    // Passando categorias para objetos do tipo tv
    moviesArray.map( (movie: any, movieIndex: any) => {
        catsListTv.find( (cat: any, catIndex: any) => {
            if( movie.media_type as string === "tv" &&  cat.id === movie.category[0] ){
                movie.category = cat.name;
            }
        });
    });

    //writeToJson(moviesArray);

    return res.status(200).json({ moviesArray });
}


function writeToJson(array: Object[]){
    
    const arrayMovies = JSON.stringify(array);
    
    const fileStream = fs.createWriteStream('./src/movies.json');
    
    fileStream.write(arrayMovies + '/n');
    
    fileStream.on('finish', () => {
        console.log('File Stream concluido');
    });

    fileStream.on('error', (error) => {
        console.log('Erro FileStream: '+error);
    });

    fileStream.end();

}   

function bulkCreate() {
    console.log('Criar em batch');
}

export { movieFetcher }

//https://api.themoviedb.org/3/trending/all/week?api_key=8c9751844a68e8e7105d68bd90f6eb25
//https://api.themoviedb.org/3/genre/movie/list?api_key=8c9751844a68e8e7105d68bd90f6eb25