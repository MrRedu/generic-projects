import { LaptopMinimal, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full p-1">
      <Button
        className="flex-1 rounded-r-none"
        variant={theme === 'light' ? 'default' : 'outline'}
        onClick={() => setTheme('light')}
      >
        <Sun />
      </Button>
      <Button
        className="flex-1 rounded-none"
        variant={theme === 'system' ? 'default' : 'outline'}
        onClick={() => setTheme('system')}
      >
        <LaptopMinimal />
      </Button>
      <Button
        className="flex-1 rounded-l-none"
        variant={theme === 'dark' ? 'default' : 'outline'}
        onClick={() => setTheme('dark')}
      >
        <Moon />
      </Button>
    </div>
  );
};
