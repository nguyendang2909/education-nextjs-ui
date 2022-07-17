import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ERole } from './enums';

export type NavMenuItem = {
  name: string;
  path: string;
  query?: Record<string, any>;
  icon?: IconProp;
  info?: string;
  children?: NavMenuItem[];
  requiredRoles?: ERole[];
};
