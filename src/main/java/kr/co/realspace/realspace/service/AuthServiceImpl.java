package kr.co.realspace.realspace.service;

import kr.co.realspace.realspace.dto.UserDto;
import kr.co.realspace.realspace.entity.ERole;
import kr.co.realspace.realspace.entity.Role;
import kr.co.realspace.realspace.entity.User;
import kr.co.realspace.realspace.payload.request.LoginRequest;
import kr.co.realspace.realspace.security.services.response.UserInfoResponse;
import kr.co.realspace.realspace.repository.RoleRepository;
import kr.co.realspace.realspace.repository.UserRepository;
import kr.co.realspace.realspace.security.SecurityUtil;
import kr.co.realspace.realspace.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    AuthenticationManagerBuilder managerBuilder;
    @Autowired
    JwtUtils jwtUtils;

    @Transactional
    public UserDto addUser(UserDto userDto) {
        Set<String> strRoles = userDto.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;

                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        User user = new User
                .Builder(userDto.getUsername(), encoder.encode(userDto.getPassword()))
                .email(userDto.getEmail())
                .role(roles)
                .build();

        User createdUser = userRepository.save(user);

        UserDto userResponseDto = new UserDto
                .Builder(createdUser.getUsername())
                .email(createdUser.getEmail())
                .role(createdUser.getRoles())
                .build();
        return userResponseDto;
     }
    public boolean checkExistUsername(UserDto userDto) {
        if(userRepository.existsByUsername(userDto.getUsername()))
            return true;
        return false;
    }

    public boolean checkExistEmail(UserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail()))
           return true;
        return false;
    }

    public UserInfoResponse getMyInfoBySecurity() {
        return userRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(UserInfoResponse::of)
                .orElseThrow(()->new RuntimeException("login user info is empty"));
    }

    public Object login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = loginRequest.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return jwtUtils.generateTokenByAuthentication(authentication);
    }
}
