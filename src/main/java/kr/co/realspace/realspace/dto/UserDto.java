package kr.co.realspace.realspace.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

/* @Value 어노테이션을 이용하게 되면 필드에 자동으로 private final 이 붙게 되고
 * @Getter만 사용하며 @Setter는 생성하지 않기 때문에 각 필드는 getter method만이 생성된다.
 * @Data 어노테이션에서 유용하게 쓰이는 toString(), equals(), hashCode() 메서드 또한 생성시켜준다.
 * 이렇게 반복적인 코드를 줄여주고 불변의 객체로 손쉽게 만들 수 있는 장점이 있어 사용함
 */

public class UserDto {
    @NotBlank
    @Size(min = 3, max = 20)
    private final String username;
    @NotBlank
    @Size(min = 4, max = 40)
    private String password;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    private Set<String> role;

    public static class Builder{
       private final String name;
       public Builder(String name){
           this.name = name;
       }
    }


}
