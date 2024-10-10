package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.GifImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GifImageRepository extends JpaRepository<GifImage, Long> {
}
