package com.marcin.kupiec.logopedia.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcin.kupiec.logopedia.exceptions.ResourceNotFoundException;
import com.marcin.kupiec.logopedia.model.Grupa;
import com.marcin.kupiec.logopedia.model.Role;
import com.marcin.kupiec.logopedia.model.User;
import com.marcin.kupiec.logopedia.repository.GrupaRepository;
import com.marcin.kupiec.logopedia.repository.PrivilegeRepository;
import com.marcin.kupiec.logopedia.repository.RoleRepository;
import com.marcin.kupiec.logopedia.repository.UserRepository;


@RestController
@RequestMapping("/systemApp/restControllerAppUs")
public class ZarzadzanieUsersControllerRest {
	@Autowired
	UserRepository usr;
	@Autowired
	RoleRepository rr;
	@Autowired
	PrivilegeRepository pr;
	@Autowired
	GrupaRepository gr;
	@Autowired
	private PasswordEncoder passwordEncoder;

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")	
@GetMapping(path = "/getUsers")
    public UserObjectRest getUsers() {
    	UserObjectRest urest=new UserObjectRest();
    	urest.setUsersList(usr.findAll());
    	urest.setRlm(rr.findAll());
        return urest; 
    }

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@PostMapping(path = "/addUsers")
public User addUser(@Valid @RequestBody User userDetails) throws ResourceNotFoundException {
	List<Role> rls=new ArrayList<Role>();
	Grupa gks=gr.findById(userDetails.getGrupa().getId()).orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userDetails.getGrupa().getId()));
	
	for(Role r:userDetails.getRoleCollection()) {
		Role rSave=rr.findById(r.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + r.getId()));
	   rls.add(rSave);
	}
	userDetails.setGrupa(gks);
	userDetails.setRoleCollection(rls);
	userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));
	usr.save(userDetails);
    return userDetails; 
} 

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@PutMapping("/updateUsers")
	public User updateUsers(@Valid @RequestBody User userDetails) throws ResourceNotFoundException{
		
	User userSave= usr.findById(userDetails.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userDetails.getId()));
	userSave.setEnabled(userDetails.isEnabled());
	if(!userDetails.getPassword().equals(userSave.getPassword()))
	userSave.setPassword(passwordEncoder.encode(userDetails.getPassword()));
	
	userSave.setUsername(userDetails.getUsername());
	List<Role> rls=new ArrayList<Role>();
	for(Role r:userDetails.getRoleCollection()) {
		Role rSave=rr.findById(r.getId()).orElseThrow(() -> new ResourceNotFoundException("Role not found for this id :: " + r.getId()));
	   rls.add(rSave);
	}
	userSave.setRoleCollection(rls);
	Grupa gks=gr.findById(userDetails.getGrupa().getId()).orElseThrow(() -> new ResourceNotFoundException("Role not found for this id :: " + userDetails.getGrupa().getId()));
	userSave.setGrupa(gks);
	
	usr.save(userSave);
		return userSave;
	}

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@GetMapping(path ={"findUser/{name}"})
		public User findUser(@PathVariable("name") String username) throws ResourceNotFoundException {
			return usr.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found for this name :: " + username));
		}

@GetMapping("/findUserId/{id}")
User findOne(@PathVariable Integer id) throws ResourceNotFoundException {
    return usr.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));
}

@GetMapping("/findAuthenticUserByName/{name}")
User findIdUserByName(@PathVariable("name") String username) throws ResourceNotFoundException {
	User usout = usr.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("User not found for this name :: " + username));
	User usrequest = new User();
	usrequest.setGrupa(usout.getGrupa());
	usrequest.setId(usout.getId());
	usrequest.setRoleCollection(usout.getRoleCollection());
	usrequest.setUsername(usout.getUsername());
	return usrequest;
}

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@DeleteMapping(path ={"deleteUsers/{id}"})
		public User removeUser(@PathVariable("id") int id) throws ResourceNotFoundException {
			User user = usr.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));
				if(user != null){
						usr.delete(user);
					}
				return user;
		}

}

