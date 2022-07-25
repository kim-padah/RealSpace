package kr.co.realspace.realspace.dto;

import kr.co.realspace.realspace.entity.Authority;
import kr.co.realspace.realspace.entity.Member;
import org.springframework.security.crypto.password.PasswordEncoder;

public class MemberRequestDto {
    private String username;
    private String password;
    private String email;

    public Member toMember(PasswordEncoder passwordEncoder){
        return Member.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .authority(Authority.ROLE_USER)
                .build();
    }
}
