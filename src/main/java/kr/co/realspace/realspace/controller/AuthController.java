package kr.co.realspace.realspace.controller;

import kr.co.realspace.realspace.dto.UserDto;
import kr.co.realspace.realspace.payload.response.MessageResponse;
import kr.co.realspace.realspace.service.AuthServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthServiceImpl authServiceImpl;

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
        authServiceImpl.addUser(userDto);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


}