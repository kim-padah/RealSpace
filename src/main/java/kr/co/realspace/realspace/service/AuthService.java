package kr.co.realspace.realspace.service;

import kr.co.realspace.realspace.dto.MemberRequestDto;
import kr.co.realspace.realspace.dto.MemberResponseDto;
import kr.co.realspace.realspace.dto.TokenDto;
import kr.co.realspace.realspace.entity.Member;
import kr.co.realspace.realspace.repository.MemberRepository;
import kr.co.realspace.realspace.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public MemberResponseDto signup(MemberRequestDto requestDto){
        Member member = requestDto.toMember(passwordEncoder);
        return MemberResponseDto.of(memberRepository.save(member));
    }
    public TokenDto login(MemberRequestDto requestDto){
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication);
    }

    public boolean checkExistUsername(MemberRequestDto requestDto) {
        if(memberRepository.existsByUsername(requestDto.getUsername()))
            return true;
        return false;
    }

    public boolean checkExistEmail(MemberRequestDto requestDto) {
        if (memberRepository.existsByEmail(requestDto.getEmail()))
            return true;
        return false;
    }
}
