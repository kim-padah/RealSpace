//package kr.co.realspace.realspace.controller;
//
//import kr.co.realspace.realspace.dto.UserDto;
//import kr.co.realspace.realspace.payload.request.LoginRequest;
//import kr.co.realspace.realspace.security.services.response.MessageResponse;
//import kr.co.realspace.realspace.security.services.response.UserInfoResponse;
//import kr.co.realspace.realspace.security.jwtbefore.JwtUtils;
//import kr.co.realspace.realspace.service.AuthServiceBeforeCodeImpl;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//
//@Slf4j
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping("/auth")
//public class AuthControllerBefore {
//    @Autowired
//    AuthServiceBeforeCodeImpl authServiceImpl;
//    @Autowired
//    AuthenticationManager authenticationManager;
//    @Autowired
//    JwtUtils jwtUtils;
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> signUp(@Valid @RequestBody UserDto userDto) {
//        if (authServiceImpl.checkExistUsername(userDto)) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(new MessageResponse("Error: Username is already taken!"));
//        }
//        if (authServiceImpl.checkExistEmail(userDto)) {
//            return ResponseEntity
//                    .badRequest()
//                    .body(new MessageResponse("Error: Email is already in use!"));
//        }
//        UserDto createdDto = authServiceImpl.addUser(userDto);
//        return ResponseEntity.status(HttpStatus.OK).body(createdDto);
//    }
////    @PostMapping("/login")
////    public ResponseEntity<?> Login(@Valid @RequestBody LoginRequest loginRequest) {
////
////        Authentication authentication = authenticationManager.authenticate(
////                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
////
////        SecurityContextHolder.getContext().setAuthentication(authentication);
////        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
////        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
////        List<String> roles = userDetails.getAuthorities().stream()
////                .map(item -> item.getAuthority())
////                .collect(Collectors.toList());
////
////        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
////                .body(new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),roles));
////    }
//    @PostMapping("/login")
//    public ResponseEntity<?> Login(@Valid @RequestBody LoginRequest loginRequest) {
//
//        return ResponseEntity.ok(authServiceImpl.login(loginRequest));
//    }
//    //여기에 spring security middleware가 jwt를 헤더를 체크하고 ok면 유저정보, 아니면 'unauthorized msg'
//    @GetMapping("/check")
//    public ResponseEntity<UserInfoResponse>Check(@RequestHeader HttpHeaders header){
//                    UserInfoResponse userInfoResponse= authServiceImpl.getMyInfoBySecurity();
//                    return ResponseEntity.ok(userInfoResponse);
////        HttpHeaders headerV = header;
////        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
////        List<String> roles = userDetails.getAuthorities().stream()
////                .map(item -> item.getAuthority())
////                .collect(Collectors.toList());
////        return ResponseEntity.ok().body(new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),roles));
//    }
//}