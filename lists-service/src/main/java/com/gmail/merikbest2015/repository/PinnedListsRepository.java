package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.commons.models.PinnedLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PinnedListsRepository extends JpaRepository<PinnedLists, Long> {
}
