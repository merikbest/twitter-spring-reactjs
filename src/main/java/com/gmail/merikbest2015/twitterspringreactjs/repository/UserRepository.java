package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

//    List<User> findByFullNameContaining(@Param("fullName") String fullName);

    List<User> findByFullNameOrUsernameContaining(@Param("fullName") String fullName,
                                                  @Param("username") String username);

    User findByActivationCode(String code);

    User findByPasswordResetCode(String code);

    List<User> findTop5By();
}
