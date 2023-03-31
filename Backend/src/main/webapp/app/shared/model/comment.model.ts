import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface IComment {
  id?: number;
  text?: string;
  date?: string | null;
  creator?: IUser | null;
  recipe?: IRecipe;
}

export const defaultValue: Readonly<IComment> = {};
