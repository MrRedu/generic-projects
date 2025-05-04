import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePreferencesStore } from '@/stores/events/preferences.store';

export const SwitchWeekStartsOn = () => {
  const weekStartsOn = usePreferencesStore((state) => state.weekStartsOn);
  const toggleWeekStartsOn = usePreferencesStore(
    (state) => state.toggleWeekStartsOn
  );

  return (
    <div className="flex flex-col gap-2 w-full p-1">
      <p className="text-sm font-medium">Comenzar la semana con</p>
      <div className="flex gap-2 items-center mx-0">
        <Label className="text-sm font-normal" htmlFor="week-starts-on">
          Lunes
        </Label>
        <Switch
          id="week-starts-on"
          checked={weekStartsOn === 'sunday'}
          onCheckedChange={toggleWeekStartsOn}
        />
        <Label className="text-sm font-normal" htmlFor="week-starts-on">
          Domingo
        </Label>
      </div>
    </div>
  );
};
