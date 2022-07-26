package kr.co.realspace.realspace.controller;

import kr.co.realspace.realspace.dto.MemberRequestDto;
import kr.co.realspace.realspace.dto.MemberResponseDto;
import kr.co.realspace.realspace.dto.TokenDto;
import kr.co.realspace.realspace.security.services.response.MessageResponse;
import kr.co.realspace.realspace.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody MemberRequestDto requestDto) {
        if (authService.checkExistUsername(requestDto)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (authService.checkExistEmail(requestDto)) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }
}
