export interface Movie {
    id: number;
    title: string;
    genre: string;
    release_date: string;
    end_date: string;
    trailer: string;
    director: string;
    image: string;
    rated: number;
    actor: string;
    duration: number;
    status: string;
    description: string;
    is_early_showtime: 0 | 1
}