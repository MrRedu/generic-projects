import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEventsStore } from '@/stores/events/events.store';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ThemeToggle } from '../molecules/theme-toggle';

export const Header = () => {
  const resetEvents = useEventsStore((state) => state.resetEvents);

  return (
    <>
      <header>
        <div className="flex items-center justify-between px-4 py-2  border-b  max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold sr-only">CountdownApp</h1>
          <img src="/icon.svg" alt="Logo" className="w-8 h-8" />
          <div className="flex items-center gap-1">
            <Button size="icon" variant="ghost">
              <Bell />
            </Button>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="iconSm" variant="ghost">
                    <Settings />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Preferencias</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem disabled>Perfil</DropdownMenuItem>

                  {/* <AlertDialogPortal> */}
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full justify-start p-2 font-normal"
                      size="sm"
                      variant="ghost"
                    >
                      Eliminar eventos
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Está completamente seguro?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará
                        permanentemente sus eventos del servidor.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={resetEvents}>
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                  {/* </AlertDialogPortal> */}

                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
                    <DropdownMenuLabel>Apariencia</DropdownMenuLabel>
                    <ThemeToggle />
                    {/* <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Color</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Azul</DropdownMenuItem>
                          <DropdownMenuItem>Rojo</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub> */}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <a
                      href="https://github.com/MrRedu/generic-projects/tree/main/42"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Source code"
                      className="flex items-center gap-2"
                    >
                      GitHub
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>Support</DropdownMenuItem>
                  {/* <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </AlertDialog>
          </div>
        </div>
      </header>
    </>
  );
};
