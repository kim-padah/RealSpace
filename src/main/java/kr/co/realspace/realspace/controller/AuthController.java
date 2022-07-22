package kr.co.realspace.realspace.controller;

import kr.co.realspace.realspace.dto.UserDto;
import kr.co.realspace.realspace.payload.request.LoginRequest;
import kr.co.realspace.realspace.payload.response.MessageResponse;
import kr.co.realspace.realspace.payload.response.UserInfoResponse;
import kr.co.realspace.realspace.security.jwt.JwtUtils;
import kr.co.realspace.realspace.security.services.UserDetailsImpl;
import kr.co.realspace.realspace.service.AuthServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthServiceImpl authServiceImpl;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserDto userDto) {
        if (authServiceImpl.checkExistUsername(userDto)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (authServiceImpl.checkExistEmail(userDto)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        UserDto createdDto = authServiceImpl.addUser(userDto);
        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
    }
    @PostMapping("/login")
    public ResponseEntity<?> Login(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),roles));
    }
    //여기에 spring security middleware가 jwt를 헤더를 체크하고 ok면 유저정보, 아니면 'unauthorized msg'
    @GetMapping("/check")
    public ResponseEntity<?>Check(@RequestHeader HttpHeaders header){

        HttpHeaders headerV = header;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),roles));
    }
}