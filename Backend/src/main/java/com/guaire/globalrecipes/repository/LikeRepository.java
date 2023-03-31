package com.guaire.globalrecipes.repository;

import com.guaire.globalrecipes.domain.Like;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Like entity.
 */
@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    @Query("select jhiLike from Like jhiLike where jhiLike.user.login = ?#{principal.username}")
    List<Like> findByUserIsCurrentUser();

    default Optional<Like> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Like> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Like> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct jhiLike from Like jhiLike left join fetch jhiLike.user left join fetch jhiLike.recipe",
        countQuery = "select count(distinct jhiLike) from Like jhiLike"
    )
    Page<Like> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct jhiLike from Like jhiLike left join fetch jhiLike.user left join fetch jhiLike.recipe")
    List<Like> findAllWithToOneRelationships();

    @Query("select jhiLike from Like jhiLike left join fetch jhiLike.user left join fetch jhiLike.recipe where jhiLike.id =:id")
    Optional<Like> findOneWithToOneRelationships(@Param("id") Long id);
}
