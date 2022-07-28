package kr.co.realspace.realspace.service;

import kr.co.realspace.realspace.dto.MemberRequestDto;
import kr.co.realspace.realspace.dto.MemberResponseDto;
import kr.co.realspace.realspace.dto.TokenDto;
import kr.co.realspace.realspace.entity.Authority;
import kr.co.realspace.realspace.entity.Member;
import kr.co.realspace.realspace.repository.MemberRepository;
import kr.co.realspace.realspace.security.SecurityUtil;
import kr.co.realspace.realspace.security.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public MemberResponseDto signup(MemberRequestDto requestDto) {
        Member member = requestDto.toMember(passwordEncoder);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    public TokenDto login(MemberRequestDto requestDto) {
//        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

//        Member foundMember = memberRepository.findByUsername(requestDto.getUsername()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user not exist"));
//        UsernamePasswordAuthenticationToken authenticationToken =
//                new UsernamePasswordAuthenticationToken(requestDto.getUsername(), requestDto.getPassword());
//
////        System.out.println(foundMember.getPassword() + "@@@@@@@@@@@@@@@@@@@@@@");
////        System.out.println(passwordEncoder.encode(requestDto.getPassword()) + "!!!!!!!!!!!!!!!!!!!!!!!");
////        System.out.println(requestDto.getPassword() + "!!!!!!!!!!!!!!!!!!!!!!!");
////
////        if (!foundMember.getPassword().equals(passwordEncoder.encode(requestDto.getPassword())))
////            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "wrong password");
//
////        Authentication authentication = new UsernamePasswordAuthenticationToken(requestDto.getUsername(),"");
//
//        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDto.getUsername(),requestDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);


        System.out.println(authentication + "@@@@@@@@@@@@@@@@@@@@@@");

//        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication);
    }

    public MemberResponseDto check() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("Login User Info is not exist"));
    }

    public boolean checkExistUsername(MemberRequestDto requestDto) {
        if (memberRepository.existsByUsername(requestDto.getUsername()))
            return true;
        return false;
    }

    public boolean checkExistEmail(MemberRequestDto requestDto) {
        if (memberRepository.existsByEmail(requestDto.getEmail()))
            return true;
        return false;
    }
}
