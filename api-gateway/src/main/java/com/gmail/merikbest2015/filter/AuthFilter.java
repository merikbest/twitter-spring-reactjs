package com.gmail.merikbest2015.filter;

import com.gmail.merikbest2015.dto.UserPrincipalResponse;
import com.gmail.merikbest2015.security.JwtAuthenticationException;
import com.gmail.merikbest2015.security.JwtProvider;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private final JwtProvider jwtProvider;

    public AuthFilter(JwtProvider jwtProvider) {
        super(Config.class);
        this.jwtProvider = jwtProvider;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String token = jwtProvider.resolveToken(exchange.getRequest());
            boolean isTokenValid = jwtProvider.validateToken(token);

            if (token != null && isTokenValid) {
                UserPrincipalResponse userPrincipal = jwtProvider.getUserPrincipal(token);
                exchange.getRequest()
                        .mutate()
                        .header("X-auth-user-id", String.valueOf(userPrincipal.getId()))
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
