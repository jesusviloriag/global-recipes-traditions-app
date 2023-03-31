package com.guaire.globalrecipes.repository;

import com.guaire.globalrecipes.domain.Recipe;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Recipe entity.
 */
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("select recipe from Recipe recipe where recipe.creator.login = ?#{principal.username}")
    List<Recipe> findByCreatorIsCurrentUser();

    default Optional<Recipe> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Recipe> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Recipe> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct recipe from Recipe recipe left join fetch recipe.creator",
        countQuery = "select count(distinct recipe) from Recipe recipe"
    )
    Page<Recipe> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct recipe from Recipe recipe left join fetch recipe.creator")
    List<Recipe> findAllWithToOneRelationships();

    @Query("select recipe from Recipe recipe left join fetch recipe.creator where recipe.id =:id")
    Optional<Recipe> findOneWithToOneRelationships(@Param("id") Long id);

    Page<Recipe> findByCreator_Id(Long id, Pageable pageable);
}
