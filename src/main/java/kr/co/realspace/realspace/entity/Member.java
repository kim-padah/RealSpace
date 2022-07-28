package kr.co.realspace.realspace.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String username;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) { this.password = password; }

    @Builder
    public Member(Long id, String email, String password, String username, Authority authority) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.authority = authority;
    }
}