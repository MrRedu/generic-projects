// {
//   id: "36b8f84d-df4e-4d49-b662-bcde71a8764f",
//   title: "Mi boda",
//   description: "Boda con mi pareja",
//   targetDate: "2025-12-31T00:00:00",
//   theme: "purple",      // Para Tailwind
//   reminder: {           // Opcional
//     daysBefore: 7,
//     notify: true
//   }
// }

export type Event = {
  id: string;
  title: string;
  description?: string;
  targetDate: Date;
  theme: string;
  reminder?: {
    daysBefore: number;
    notify: boolean;
  };
};

export type FormatHours = '12h' | '24h';
export type WeekStartsOn = 'monday' | 'sunday';
