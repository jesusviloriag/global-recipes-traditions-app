import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './recipe.reducer';

export const RecipeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const recipeEntity = useAppSelector(state => state.recipe.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="recipeDetailsHeading">Recipe</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{recipeEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{recipeEntity.title}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {recipeEntity.image ? (
              <div>
                {recipeEntity.imageContentType ? (
                  <a onClick={openFile(recipeEntity.imageContentType, recipeEntity.image)}>
                    <img src={`data:${recipeEntity.imageContentType};base64,${recipeEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {recipeEntity.imageContentType}, {byteSize(recipeEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{recipeEntity.description}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{recipeEntity.city}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>
            {recipeEntity.creationDate ? <TextFormat value={recipeEntity.creationDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>Creator</dt>
          <dd>{recipeEntity.creator ? recipeEntity.creator.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/recipe" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recipe/${recipeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default RecipeDetail;
