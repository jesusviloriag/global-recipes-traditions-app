import recipe from 'app/entities/recipe/recipe.reducer';
import comment from 'app/entities/comment/comment.reducer';
import like from 'app/entities/like/like.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  recipe,
  comment,
  like,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
