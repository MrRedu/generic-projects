import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EventForm, type EventFormProps } from './event-form';

interface EventModalProps extends EventFormProps {
  children?: React.ReactNode;
}

export const EventModal = ({ children, isEditing, event }: EventModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>{isEditing ? 'Editar evento' : 'Agregar evento'}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar evento' : 'Agregar evento'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Modifica detalles o añade nuevas actividades a tu programación.'
              : 'Personaliza fechas, horarios y descripciones según tus necesidades.'}
          </DialogDescription>
        </DialogHeader>
        <EventForm isEditing={isEditing} event={event} />
      </DialogContent>
    </Dialog>
  );
};
