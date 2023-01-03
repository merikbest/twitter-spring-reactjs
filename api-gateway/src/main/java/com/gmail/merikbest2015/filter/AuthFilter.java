package com.gmail.merikbest2015.filter;

import com.gmail.merikbest2015.commons.dto.UserPrincipalResponse;
import com.gmail.merikbest2015.commons.security.JwtAuthenticationException;
import com.gmail.merikbest2015.commons.security.JwtProvider;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private final JwtProvider jwtProvider;
    private final RestTemplate restTemplate;

    public AuthFilter(JwtProvider jwtProvider, RestTemplate restTemplate) {
        super(Config.class);
        this.jwtProvider = jwtProvider;
        this.restTemplate = restTemplate;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = jwtProvider.resolveToken(exchange.getRequest());
            boolean isTokenValid = jwtProvider.validateToken(token);

            if (token != null && isTokenValid) {
                String email = jwtProvider.parseToken(token);
                UserPrincipalResponse user = restTemplate.getForObject(
                        "http://localhost:8001/api/v1/auth/user/{email}",
                        UserPrincipalResponse.class,
                        email
                );

                if (user.getActivationCode() != null) {
                    throw new JwtAuthenticationException("Email not activated");
                }
                exchange.getRequest()
                        .mutate()
                        .header("X-auth-user-id", String.valueOf(user.getId()))
                        .build();
            } else {
                throw new JwtAuthenticationException("JWT token is expired or invalid");
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {
    }
}
