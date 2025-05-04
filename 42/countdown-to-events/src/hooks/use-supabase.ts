import { supabase } from '@/supabase/supabase.config';
import { useState, useEffect } from 'react';

type Instrument = {
  id: number;
  name: string;
};

//* Este hook es solo para probar la conexión de Supabase con el proyecto 🎉
export function useSupabase() {
  const [data, setData] = useState<Instrument[]>([]);

  async function getInstruments() {
    const { data } = await supabase.from('instruments').select();
    setData(data as Instrument[]);
  }

  useEffect(() => {
    getInstruments();
  }, []);

  return {
    data,
  };
}
