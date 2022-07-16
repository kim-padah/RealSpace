package kr.co.realspace.realspace.service;

import kr.co.realspace.realspace.dto.UserDto;

public interface AuthService {
    UserDto addUser(UserDto userDto);
    boolean checkExistUsername(UserDto userDto);
    boolean checkExistEmail(UserDto userDto);

//    UserDto readUserList();
//    UserDto readUser(Long id);
//    UserDto editUser(UserDto userDto, Long id);
//    void deleteUser(Long id);

//    default toEntity(){
//          form data need to be modified so not use this
//    }
//    default of(){
//          entity data need to be modified so not use this
//    }
}
