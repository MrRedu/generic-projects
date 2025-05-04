import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePreferencesStore } from '@/stores/events/preferences.store';

export const SwitchFormatHours = () => {
  const formatHours = usePreferencesStore((state) => state.formatHours);
  const toggleFormatHours = usePreferencesStore(
    (state) => state.toggleFormatHours
  );

  return (
    <div className="flex flex-col gap-2 w-full p-1">
      <p className="text-sm font-medium">Formato de horas</p>
      <div className="flex gap-2 items-center mx-0">
        <Label className="text-sm font-normal" htmlFor="format-hours">
          12h
        </Label>
        <Switch
          id="format-hours"
          checked={formatHours === '24h'}
          onCheckedChange={toggleFormatHours}
        />
        <Label className="text-sm font-normal" htmlFor="format-hours">
          24h
        </Label>
      </div>
    </div>
  );
};
