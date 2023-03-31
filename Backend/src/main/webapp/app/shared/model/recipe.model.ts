import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IRecipe {
  id?: number;
  title?: string;
  imageContentType?: string | null;
  image?: string | null;
  description?: string | null;
  city?: string | null;
  creationDate?: string | null;
  creator?: IUser | null;
}

export const defaultValue: Readonly<IRecipe> = {};
