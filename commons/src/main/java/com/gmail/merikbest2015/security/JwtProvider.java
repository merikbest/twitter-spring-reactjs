package com.gmail.merikbest2015.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import static com.gmail.merikbest2015.constants.ErrorMessage.JWT_TOKEN_EXPIRED;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.header}")
    private String authorizationHeader;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long validityInMilliseconds;

    public String createToken(String email, String role) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + validityInMilliseconds * 1000))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String resolveToken(ServerHttpRequest request) {
        return request.getHeaders().getFirst(authorizationHeader);
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = getJwsClaims(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException exception) {
            throw new JwtAuthenticationException(JWT_TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
        }
    }

    public String parseToken(String token) {
        return getJwsClaims(token).getBody().getSubject();
    }

    private Jws<Claims> getJwsClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
