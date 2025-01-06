import { Injectable } from '@angular/core';
import { SubscribeRepository } from '../repository/subscribe.repository';
import { Subscribe } from '../models/Subscribe';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

    private dataSource: SubscribeRepository;
    private subscribes: Subscribe[];

    constructor() {
      this.dataSource = new SubscribeRepository();
      this.subscribes = new Array<Subscribe>();

      this.dataSource.getSubscribe().forEach(p => this.subscribes.push(p));
    }

    // getMovies(): Movie[] {
    //   return Movies;
    // }

    // getMovies(): Observable<Movie[]> {
    //   return of(Movies);
    // }

    //---------------------
    // getMovies(): void {
    //   this.movieService.getMovies()
    //       .subscribe(movies => {
    //           this.movies = movies;
    //       });
    // }


    getSubscribes() :Subscribe[] {
      return this.subscribes;
    }
    getActiveSubscribes() :Subscribe[] {
      return this.subscribes.filter(s=>s.isActive);
    }
    getDisableSubscribes() :Subscribe[] {
      return this.subscribes.filter(i=>!i.isActive).reverse();
    }

    getSubscribe(id:number) :Subscribe | undefined {
        return this.subscribes.find(i=>i.id==id);
      }

      createSubscribe(subscribe: Subscribe): void{
        subscribe.id=(this.subscribes.at(-1)?.id?? 0) + 1;
        this.subscribes.push(subscribe);
      }

      updateSubscribe(subscribe: Subscribe): void {
        const index = this.subscribes.findIndex(p => p.id === subscribe.id);
        if (index !== -1) {
          this.subscribes[index] = subscribe;
        }
      }
      deleteSubscribe(id: number): void {
        const index = this.subscribes.findIndex(p => p.id === id);
        if (index !== -1) {
          this.subscribes.splice(index, 1);
        }
      }
}

/*

export class MovieService {

  private apiMoviesUrl = 'api/movies';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
    ) { }

  getMovies(): Observable<Movie[]> {
    this.loggingService.add('MovieService: listing movies');
    return this.http.get<Movie[]>(this.apiMoviesUrl);
  }

  getMovie(id): Observable<Movie> {
    this.loggingService.add('MovieService: get detail by id='+id)
    return this.http.get<Movie>(this.apiMoviesUrl+'/'+id);
  }

  update(movie: Movie):Observable<any> {
    const httpOptions= {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiMoviesUrl, movie, httpOptions)
  }

  add(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiMoviesUrl, movie);
  }

  delete(movie: Movie): Observable<Movie> {
    return this.http.delete<Movie>(this.apiMoviesUrl+'/'+movie.id);
  }
}



export class MoviesComponent {
    title = 'Movie List';
    movies: Movie[];
    selectedMovie: Movie;

    constructor(private movieService: MovieService) { }

    ngOnInit(): void {
        this.getMovies();
    }

    onSelect(movie: Movie): void {
        this.selectedMovie = movie;
    }

    getMovies(): void {
        this.movieService.getMovies()
            .subscribe(movies => {
                this.movies = movies;
            });
    }

    add(name: string, imageUrl: string, description: string): void {
        this.movieService.add({
            name,
            imageUrl,
            description
        } as Movie).subscribe(movie => this.movies.push(movie));
    }

    delete(movie: Movie): void {
        this.movies = this.movies.filter(m => m !== movie);
        this.movieService.delete(movie).subscribe();
    }

}

*/
