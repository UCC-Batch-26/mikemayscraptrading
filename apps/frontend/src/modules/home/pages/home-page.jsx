import { usePing } from '@/modules/home/hooks/use-ping';
import { useEffect } from 'react';
import { TodaysRevenue } from '../components/todays-revenue';

export function HomePage() {
  const { ping, status } = usePing();

  useEffect(() => {
    ping();
  }, [ping]);

  return (
    <div className="grid gap-2 container mx-auto">
      <div className="text-center">Backend Connection: {status}</div>

      <div className="flex items-center justify-center ">
        <TodaysRevenue revenue={50000} />
      </div>
    </div>
  );
}
