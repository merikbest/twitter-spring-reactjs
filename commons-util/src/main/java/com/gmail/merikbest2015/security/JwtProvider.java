package com.gmail.merikbest2015.security;

import com.gmail.merikbest2015.client.user.AuthenticationClient;
import com.gmail.merikbest2015.dto.UserPrincipalResponse;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.header:Authorization}")
    private String authorizationHeader;

    @Value("${jwt.secret:dejavu}")
    private String secretKey;

    @Value("${jwt.expiration:6048000}")
    private long validityInMilliseconds;

    private final AuthenticationClient authenticationClient;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String email, String role) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String resolveToken(ServerHttpRequest request) {
        return request.getHeaders().getFirst(authorizationHeader);
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException exception) {
            throw new JwtAuthenticationException("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public UserPrincipalResponse getUserPrincipal(String token) {
        String email = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        UserPrincipalResponse user = authenticationClient.getUserPrincipalByEmail(email);

        if (user.getActivationCode() != null) {
            throw new JwtAuthenticationException("Email not activated");
        }
        return user;
    }
}
