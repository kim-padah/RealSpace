package kr.co.realspace.realspace.service;

import kr.co.realspace.realspace.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

public interface AuthService {
    void addUser(UserDto userDto);
    boolean checkExistUsername(UserDto userDto);
    boolean checkExistEmail(UserDto userDto);

//    UserDto readUserList();
//    UserDto readUser(Long id);
//    UserDto editUser(UserDto userDto, Long id);
//    void deleteUser(Long id);
}
