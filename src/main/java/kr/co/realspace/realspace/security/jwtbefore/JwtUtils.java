//package kr.co.realspace.realspace.security.jwtbefore;
//
//import kr.co.realspace.realspace.security.services.UserDetailsImpl;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseCookie;
//import org.springframework.stereotype.Component;
//import org.springframework.web.util.WebUtils;
//import io.jsonwebtoken.*;
//
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import java.util.Date;
//@Component
//public class JwtUtils {
//    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
//    @Value("${realspace.app.jwtSecret}")
//    private String jwtSecret;
//    @Value("${realspace.app.jwtExpirationMs}")
//    private int jwtExpirationMs;
//    @Value("${realspace.app.jwtCookieName}")
//    private String jwtCookie;
//
//    public String getJwtFromCookies(HttpServletRequest request) {
//        Cookie cookie = WebUtils.getCookie(request, jwtCookie);
//        if (cookie != null) {
//            return cookie.getValue();
//        } else {
//            return null;
//        }
//    }
//
//    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
//        String jwt = generateTokenFromUsername(userPrincipal.getUsername());
//        ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/auth").maxAge(24 * 60 * 60).secure(true).sameSite("None").httpOnly(true).build();
//        return cookie;
//    }
//
//
////    public ResponseCookie getCleanJwtCookie() {
////        ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/auth").build();
////        return cookie;
////    }
////
////    public String getUserNameFromJwtToken(String token) {
////        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
////    }
//
//    public boolean validateJwtToken(String authToken) {
//        try {
//            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
//            return true;
//        } catch (SignatureException e) {
//            logger.error("Invalid JWT signature: {}", e.getMessage());
//        } catch (MalformedJwtException e) {
//            logger.error("Invalid JWT token: {}", e.getMessage());
//        } catch (ExpiredJwtException e) {
//            logger.error("JWT token is expired: {}", e.getMessage());
//        } catch (UnsupportedJwtException e) {
//            logger.error("JWT token is unsupported: {}", e.getMessage());
//        } catch (IllegalArgumentException e) {
//            logger.error("JWT claims string is empty: {}", e.getMessage());
//        }
//        return false;
//    }
//
//    public String generateTokenFromUsername(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//                .signWith(SignatureAlgorithm.HS512, jwtSecret)
//                .compact();
//    }
//    public String generateTokenByAuthentication(org.springframework.security.core.Authentication authentication){
//        return Jwts.builder()
//                .setSubject(authentication.getName())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
//                .signWith(SignatureAlgorithm.HS512, jwtSecret)
//                .compact();
//    }
//
//
////    public Authentication getAuthentication(String accessToken) {
////        Claims claims = parseClaims(accessToken);
////
////        Collection<?extends GrantedAuthority> authorities =
////
////
////        UserDetailsImpl principal = new User(claims.getSubject(),"",);
////        return new UsernamePasswordAuthenticationToken(principal, "",);
////    }
//    private Claims parseClaims(String accessToken){
//        try{
//            return Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(accessToken).getBody();
//        }catch(ExpiredJwtException e){
//            return e.getClaims();
//        }
//    }
//}