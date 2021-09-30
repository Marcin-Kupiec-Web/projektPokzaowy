package com.marcin.kupiec.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.marcin.kupiec.model.Privilege;
import com.marcin.kupiec.model.Role;
import com.marcin.kupiec.model.User;
import com.marcin.kupiec.model.UserDto;
import com.marcin.kupiec.repository.RoleRepository;
import com.marcin.kupiec.repository.UserRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private PasswordEncoder bcryptEncoder;

	 @Autowired
	    private UserRepository usersRepository;
	  @Autowired
	    private RoleRepository roleRepository;
	  
	  private User user;
	  
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
				
		user = usersRepository.findByUsername(username);
		
       if (user == null) {
           return new org.springframework.security.core.userdetails.User(
             " ", " ", true, true, true, true,getAuthorities(Arrays.asList(roleRepository.findByName("ROLE_USER"))));
       }

       return new org.springframework.security.core.userdetails.User(
         user.getUsername(),user.getPassword(), user.isEnabled(), true, true, 
         true, getAuthorities(user.getRoleCollection()));
         
   }
	 
	  private List<String> getPrivileges(List<Role> roles) {
	        List<String> privileges = new ArrayList<>();
	        List<String> rols=new ArrayList<>();
	        List<Privilege> collection = new ArrayList<>();
	        for (Role role : roles) {
	        	rols.add(role.getName());
	            collection.addAll(role.getPrivileges());
	        }
	        for (Privilege item : collection) {
	            privileges.add(item.getName());
	        }
	        return privileges;
	    }
	  
	 private Collection<? extends GrantedAuthority> getAuthorities(
		      List<Role> roles) {
		        return getGrantedAuthorities(getPrivileges(roles));
		    }
	 
	  private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
	        List<GrantedAuthority> authorities = new ArrayList<>();
	        for (String privilege : privileges) {
	            authorities.add(new SimpleGrantedAuthority(privilege));
	        }
	        return authorities;
	    }

	  public String[] getRole() {
		  return user.getRoleCollectionToString().split(", ");
	  }
	  
	  public String[] getPrivilegesString() {
		  return this.getPrivileges(user.getRoleCollection()).stream().toArray(String[]::new);
	  }
	public User save(UserDto user) {
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));		
		return usersRepository.save(newUser);
	}
}
