import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface ILike {
  id?: number;
  date?: string | null;
  user?: IUser | null;
  recipe?: IRecipe;
}

export const defaultValue: Readonly<ILike> = {};
