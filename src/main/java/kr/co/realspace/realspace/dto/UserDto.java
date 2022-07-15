package kr.co.realspace.realspace.dto;

import kr.co.realspace.realspace.entity.User;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Getter
@Builder
public class UserDto {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
    @NotBlank
    @Size(min = 4, max = 40)
    private String password;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    private Set<String> role;

    //remove toEntity() cuz this form data should be modified
}
