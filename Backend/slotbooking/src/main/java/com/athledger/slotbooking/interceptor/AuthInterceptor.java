package com.athledger.slotbooking.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;
import java.util.Map;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final String AUTH_SERVICE_URL = "http://authorization:8083/auth/user"; // Update with real host

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK); // ✅ let preflight through
            return true;
        }

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
                    .anyMatch(role -> role.get("authority").equals("ADMIN") || role.get("authority").equals("USER"));

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
