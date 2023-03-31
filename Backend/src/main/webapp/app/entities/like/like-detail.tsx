import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './like.reducer';

export const LikeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const likeEntity = useAppSelector(state => state.like.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="likeDetailsHeading">Like</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{likeEntity.id}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>{likeEntity.date ? <TextFormat value={likeEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>User</dt>
          <dd>{likeEntity.user ? likeEntity.user.login : ''}</dd>
          <dt>Recipe</dt>
          <dd>{likeEntity.recipe ? likeEntity.recipe.title : ''}</dd>
        </dl>
        <Button tag={Link} to="/like" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/like/${likeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LikeDetail;
