package com.athledger.slotmgmt.interceptor;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.List;
import java.util.Map;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final String AUTH_SERVICE_URL = "http://localhost:8083/auth/user"; // Update with real host

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return false;
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> res = restTemplate.exchange(
                    AUTH_SERVICE_URL, HttpMethod.GET, entity, Map.class);

            List<Map<String, String>> roles = (List<Map<String, String>>) res.getBody().get("roles");
            boolean isAdmin = roles.stream()
                    .anyMatch(role -> role.get("authority").equals("ADMIN"));

            if (!isAdmin) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "You must be an admin to access this");
                return false;
            }

            return true;

        } catch (Exception ex) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token validation failed");
            return false;
        }
    }
}
