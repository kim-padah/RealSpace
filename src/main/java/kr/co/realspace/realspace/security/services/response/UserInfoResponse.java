package kr.co.realspace.realspace.security.services.response;


import kr.co.realspace.realspace.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;

    public static UserInfoResponse of(User user){

        return UserInfoResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles()
                        .stream()
                        .map(item->item.getName().toString())
                        .collect(Collectors.toList()))
                .build();
    }
}
