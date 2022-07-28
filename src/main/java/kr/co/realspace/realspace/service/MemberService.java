//package kr.co.realspace.realspace.service;
//
//import kr.co.realspace.realspace.dto.MemberResponseDto;
//import kr.co.realspace.realspace.entity.Member;
//import kr.co.realspace.realspace.repository.MemberRepository;
//import kr.co.realspace.realspace.security.SecurityUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@RequiredArgsConstructor
//@Transactional(readOnly = true)
//public class MemberService {
//    private final MemberRepository memberRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public MemberResponseDto getMyInfoBySecurity(){
//        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
//                .map(MemberResponseDto::of)
//                .orElseThrow(()-> new RuntimeException("Login User Info is not exist"));
//    }
//
//    @Transactional
//    public MemberResponseDto changeMemberNickname(String username, String email){
//        Member member = memberRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("Login User Info is not exist"));
//        member.setUsername(username);
//        return MemberResponseDto.of(memberRepository.save(member));
//    }
//
//    @Transactional
//    public MemberResponseDto changeMemberPassword(String email, String exPassword, String newPassword){
//        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
//        if (!passwordEncoder.matches(exPassword, member.getPassword())) {
//            throw new RuntimeException("비밀번호가 맞지 않습니다");
//        }
//        member.setPassword(passwordEncoder.encode((newPassword)));
//        return MemberResponseDto.of(memberRepository.save(member));
//    }
//}
