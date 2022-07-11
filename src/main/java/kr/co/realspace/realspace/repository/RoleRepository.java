package kr.co.realspace.realspace.repository;

import kr.co.realspace.realspace.entity.ERole;
import kr.co.realspace.realspace.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}