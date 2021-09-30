package com.marcin.kupiec.logopedia.config;

import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.marcin.kupiec.logopedia.model.Grupa;
import com.marcin.kupiec.logopedia.model.Privilege;
import com.marcin.kupiec.logopedia.model.Role;
import com.marcin.kupiec.logopedia.model.User;
import com.marcin.kupiec.logopedia.repository.GrupaRepository;
import com.marcin.kupiec.logopedia.repository.PrivilegeRepository;
import com.marcin.kupiec.logopedia.repository.RoleRepository;
import com.marcin.kupiec.logopedia.repository.UserRepository;


@Component
public class InitialDataLoader implements
  ApplicationListener<ContextRefreshedEvent> {
 
    boolean alreadySetup = false;
 
    @Autowired
    private UserRepository userRepository;
  
    @Autowired
    private RoleRepository roleRepository;
  
    @Autowired
    private PrivilegeRepository privilegeRepository;
    
    @Autowired
    private GrupaRepository grupaRepository;
  
    @Autowired
    private PasswordEncoder passwordEncoder;
  
    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
    	    	
        if (alreadySetup)
            return;
        Role adminRole = roleRepository.findByName("ADMIN");
        if(adminRole==null) {
		        Privilege readPrivilege=createPrivilegeIfNotFound("READ_PRIVILEGE");
		        Privilege writePrivilege=createPrivilegeIfNotFound("WRITE_PRIVILEGE");
		        
		        Grupa grupaAdminow=createGrupaIfNotFound("admins");
		  
		        List<Privilege> adminPrivileges = Arrays.asList(readPrivilege, writePrivilege,createPrivilegeIfNotFound("ONLY_ADMIN_PRIVILEGE"));        
		        Role adminrol=createRoleIfNotFound("ADMIN", adminPrivileges);
		 
		        User user = new User();
		        user.setUsername("admin");
		        user.setPassword(passwordEncoder.encode("test"));
		        user.setRoleCollection(Arrays.asList(adminrol));
		        user.setGrupa(grupaAdminow);
		        user.setEnabled(true);
		        userRepository.save(user);
		 
		        alreadySetup = true;
        }
    }
 
    @Transactional
    private Privilege createPrivilegeIfNotFound(String name) {
  
        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilegeRepository.save(privilege);
        }
        return privilege;
    }
 
    @Transactional
    private Role createRoleIfNotFound(
      String name, List<Privilege> privileges) {
  
        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role();
            role.setName(name);
            role.setPoziomUprawnien(1);
            role.setPrivileges(privileges);
            roleRepository.save(role);
        }
        return role;
    }
    
    @Transactional
    private Grupa createGrupaIfNotFound(String name) {
  
    	  Grupa grupa = grupaRepository.findByName(name);
          if (grupa == null) {
              grupa = new Grupa();
              grupa.setName(name);
              grupa.setShortName("adg");
              grupa.setDescription("grupa admina");
              grupaRepository.save(grupa);
          }
          return grupa;
    }
}