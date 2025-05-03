import { useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface EventsLayoutProps {
  children: ReactNode;
}

const layoutStyle = {
  grid: 'grid',
  list: 'list',
};

export const EventsLayout = ({ children }: EventsLayoutProps) => {
  const [layout, setLayout] = useState(layoutStyle.grid);
  const toggleLayout = () =>
    setLayout((prevLayout) =>
      prevLayout === layoutStyle.grid ? layoutStyle.list : layoutStyle.grid
    );

  return (
    <>
      <div className="hidden items-center justify-end mb-4 gap-4 sm:flex">
        <Label htmlFor="grid-list">List</Label>
        <Switch
          checked={layout === layoutStyle.grid}
          onCheckedChange={toggleLayout}
          id="grid-list"
        />
        <Label htmlFor="grid-list">Grid</Label>
      </div>
      <section
        className={cn(
          'gap-4',
          layout === layoutStyle.grid
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 '
            : 'flex flex-col'
        )}
      >
        {children}
      </section>
    </>
  );
};
