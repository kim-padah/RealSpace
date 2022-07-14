package kr.co.realspace.realspace.controller;

import kr.co.realspace.realspace.entity.ERole;
import kr.co.realspace.realspace.entity.Role;
import kr.co.realspace.realspace.entity.User;
import kr.co.realspace.realspace.payload.request.SignupRequest;
import kr.co.realspace.realspace.payload.response.MessageResponse;
import kr.co.realspace.realspace.repository.RoleRepository;
import kr.co.realspace.realspace.repository.UserRepository;
import kr.co.realspace.realspace.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignupRequest signUpRequest) {
        authService.createUser(signUpRequest);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


}