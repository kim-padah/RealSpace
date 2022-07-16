package kr.co.realspace.realspace.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Size(max = 20)
    private String username;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @NotBlank
    @Size(max = 120)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(  name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    //constructor made by builder
    private User(Builder builder){
        this.username = builder.username;
        this.password= builder.password;
        this.email = builder.email;
        this.roles = builder.roles;
    }

    public static class Builder{
        private final String username;
        private final String password;
        private String email;
        private Set<Role> roles;
        public Builder(String name, String password){
            this.username = name;
            this.password = password;
        }
        public Builder email(String emailArg){
            email = emailArg;
            return this;
        }
        public Builder role(Set<Role> roleSet){
            roles = roleSet;
            return this;
        }
        public User build(){
            return new User(this);
        }
    }

}