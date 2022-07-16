package kr.co.realspace.realspace.dto;

import kr.co.realspace.realspace.entity.Role;
import kr.co.realspace.realspace.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@NoArgsConstructor
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

    public UserDto(Builder builder) {
        this.username = builder.username;
        this.password = builder.password;
        this.email = builder.email;
        this.role = builder.roles;
    }
    //remove toEntity() cuz this form data should be modified
    public static class Builder{
        private final String username;
        private String password;
        private String email;
        private Set<String> roles;
        public Builder(String name){
            this.username = name;
        }
        public UserDto.Builder email(String emailArg){
            email = emailArg;
            return this;
        }
        public UserDto.Builder role(Set<Role> roleSet){
            Set<String> stringRole = new HashSet<>();
            stringRole.add(roleSet.toString());
            roles = stringRole;
            return this;
        }
        public UserDto build(){
            return new UserDto(this);
        }
    }
}
