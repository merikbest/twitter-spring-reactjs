package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.CountryCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryCodeRepository extends JpaRepository<CountryCode, Long> {
    @Query("""
            SELECT CASE WHEN count(countryCode) > 0 THEN true ELSE false END
            FROM CountryCode countryCode
            WHERE countryCode.phoneCode = :phoneCode
            """)
    boolean isPhoneCodeExists(@Param("phoneCode") String phoneCode);
}
