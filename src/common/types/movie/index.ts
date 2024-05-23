export type TMovieCreate = {
    title: string;
    genre: string;
    actor: string;
    director: string;
    duration: number;
    status: string;
    rated: string;
    description: string;
    trailer: string;
    release_date: string;
    image: Array<object>;
}

export type TMovie = {
    id: number;
    title: string;
    genre: string;
    actor: string;
    director: string;
    duration: number;
    status: string;
    rated: string;
    description: string;
    trailer: string;
    release_date: string;
    image: string;
}