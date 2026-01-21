package com.ballet.tienda.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    // Clave secreta para firmar tokens (en producción debe estar en variables de entorno)
    private static final String SECRET_KEY = "TiendaBalletSecretKey2025SuperSegura12345678901234567890";

    // Duración del token: 24 horas
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    // Generar clave secreta
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Generar token JWT
    public String generateToken(String username, String rol, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", rol);
        claims.put("userId", userId);

        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    // Extraer username del token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Extraer rol del token
    public String extractRol(String token) {
        return extractClaims(token).get("rol", String.class);
    }

    // Extraer userId del token
    public Long extractUserId(String token) {
        return extractClaims(token).get("userId", Long.class);
    }

    // Extraer fecha de expiración
    public Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    // Extraer todos los claims del token
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Verificar si el token ha expirado
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validar token
    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }
}
