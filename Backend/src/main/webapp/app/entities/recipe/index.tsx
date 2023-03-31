import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Recipe from './recipe';
import RecipeDetail from './recipe-detail';
import RecipeUpdate from './recipe-update';
import RecipeDeleteDialog from './recipe-delete-dialog';

const RecipeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Recipe />} />
    <Route path="new" element={<RecipeUpdate />} />
    <Route path=":id">
      <Route index element={<RecipeDetail />} />
      <Route path="edit" element={<RecipeUpdate />} />
      <Route path="delete" element={<RecipeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RecipeRoutes;
