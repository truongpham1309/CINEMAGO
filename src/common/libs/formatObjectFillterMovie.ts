interface Showtime {
  id: number;
  time: string;
}

interface ShowtimeChildren {
  date: string;
  showtimes: Showtime[];
}

interface Room {
  screen: string;
  children: ShowtimeChildren;
}

interface GroupedData {
  cinema_city: string;
  cinema: string;
  rooms: Room[];
}

export const groupShowtimes = (data: any[]): GroupedData[] => {
  if (!data) return [];
  const groupedData: Record<string, Record<string, Record<string, Record<string, Showtime[]>>>> = {};

  data.forEach(item => {
    const { cinema_city, cinema_name, screen_name, show_date, show_time, id_showtime } = item;

    if (!groupedData[cinema_city]) {
      groupedData[cinema_city] = {};
    }

    if (!groupedData[cinema_city][cinema_name]) {
      groupedData[cinema_city][cinema_name] = {};
    }

    if (!groupedData[cinema_city][cinema_name][screen_name]) {
      groupedData[cinema_city][cinema_name][screen_name] = {};
    }

    if (!groupedData[cinema_city][cinema_name][screen_name][show_date]) {
      groupedData[cinema_city][cinema_name][screen_name][show_date] = [];
    }

    groupedData[cinema_city][cinema_name][screen_name][show_date].push({ id: id_showtime, time: show_time });
  });

  const result: GroupedData[] = Object.entries(groupedData).flatMap(([cinema_city, cinemas]) =>
    Object.entries(cinemas).map(([cinema, screens]) => ({
      cinema_city,
      cinema,
      rooms: Object.entries(screens).flatMap(([screen, dates]) =>
        Object.entries(dates).map(([date, showtimes]) => ({
          screen,
          children: {
            date,
            showtimes
          }
        }))
      )
    }))
  );

  return result;
}
