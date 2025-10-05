import { usePing } from '@/modules/home/hooks/use-ping';
import { useEffect } from 'react';
import { TodaysRevenue } from '../components/todays-revenue';
import { IconMenu } from '../components/icon-menu';
import { FileCog } from 'lucide-react';

export function HomePage() {
  const { ping, status } = usePing();

  useEffect(() => {
    ping();
  }, [ping]);

  return (
    <div className="grid gap-2 container mx-auto">
      <div className="text-center">Backend Connection: {status}</div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <IconMenu icon={ FileCog } title='Inventory' />
        <TodaysRevenue revenue={50000} />
      </div>
    </div>
  );
}
