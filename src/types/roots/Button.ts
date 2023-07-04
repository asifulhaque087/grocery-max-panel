// colorSchemeType
export type colorSchemeType = 'green' | 'white' | 'orange';

export interface IButton {
  label: string;
  colorScheme: colorSchemeType;
  badge: boolean;
  outline: boolean;
  loading: boolean;
  onSubmit?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}
