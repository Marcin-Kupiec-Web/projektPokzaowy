package com.marcin.kupiec.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.marcin.kupiec.exceptions.ResourceNotFoundException;
import com.marcin.kupiec.model.Grupa;
import com.marcin.kupiec.model.Privilege;
import com.marcin.kupiec.model.Role;
import com.marcin.kupiec.model.User;
import com.marcin.kupiec.repository.GrupaRepository;
import com.marcin.kupiec.repository.PrivilegeRepository;
import com.marcin.kupiec.repository.RoleRepository;
import com.marcin.kupiec.repository.UserRepository;


@RestController
@RequestMapping("/systemApp/restControllerAppUs")
public class ZarzadzanieUsersController {
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
@GetMapping(path = "/getRoles")
    public UserObjectRest getRoles() {
    	UserObjectRest urest=new UserObjectRest();
    	urest.setRlm(rr.findAll());
    	urest.setPlm(pr.findAll());
        return urest; 
    }

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")	
@GetMapping(path = "/getPrivileges")
    public List<Privilege> getPrivileges() {
        return pr.findAll(); 
    }

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@PostMapping(path = "/addRoles")
public Role addRola(@Valid @RequestBody Role rolaDetails) throws ResourceNotFoundException {
	List<Privilege> pls=new ArrayList<Privilege>();
	for(Privilege p:rolaDetails.getPrivileges()) {
		Privilege prSave=pr.findById(p.getId()).orElseThrow(() -> new ResourceNotFoundException("Role not found for this id :: " + p.getId()));
	   pls.add(prSave);
	}
	rolaDetails.setPrivileges(pls);
	rr.save(rolaDetails);
    return rolaDetails; 
} 

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@PostMapping(path = "/addPrivileges")
public Privilege addPrivileges(@Valid @RequestBody Privilege privilegeDetails) throws ResourceNotFoundException {

	pr.save(privilegeDetails);
    return privilegeDetails; 
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
@PutMapping("/updateRoles")
	public Role updateRoles(@Valid @RequestBody Role rolaDetails) throws ResourceNotFoundException{
	
	Role rolaSave= rr.findById(rolaDetails.getId()).orElseThrow(() -> new ResourceNotFoundException("Rola not found for this id :: " + rolaDetails.getId()));
	rolaSave.setName(rolaDetails.getName());
	rolaSave.setPoziomUprawnien(rolaDetails.getPoziomUprawnien());
	
	List<Privilege> prl=new ArrayList<Privilege>();
	for(Privilege pri:rolaDetails.getPrivileges()) {
		Privilege prSave=pr.findById(pri.getId()).orElseThrow(() -> new ResourceNotFoundException("Rola not found for this id :: " + pri.getId()));;
	   prl.add(prSave);
	}
	
	rolaSave.setPrivileges(prl);
	rr.save(rolaSave);
	
	return rolaSave;
	}

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@PutMapping("/updatePrivileges")
	public Privilege updatePrivileges(@Valid @RequestBody Privilege privilegeDetails) throws ResourceNotFoundException{
	
	Privilege privSave= pr.findById(privilegeDetails.getId()).orElseThrow(() -> new ResourceNotFoundException("Privilege not found for this id :: " + privilegeDetails.getId()));
	privSave.setName(privilegeDetails.getName());
	
	pr.save(privSave);
	
	return privSave;
	}

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@GetMapping(path ={"findUser/{name}"})
		public User findUser(@PathVariable("name") String username) throws ResourceNotFoundException {
			return Optional.ofNullable(usr.findByUsername(username)).orElseThrow(() -> new ResourceNotFoundException("User not found for this name :: " + username));
		}
@GetMapping("/findUserId/{id}")
User findOne(@PathVariable Integer id) throws ResourceNotFoundException {
    return usr.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + id));
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

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@DeleteMapping(path ={"deletePrivileges/{id}"})
		public Privilege removePrivilege(@PathVariable("id") int id) throws ResourceNotFoundException {
			Privilege priv = pr.findById(id).orElseThrow(() -> new ResourceNotFoundException("Privilege not found for this id :: " + id));
				if(priv != null){
						pr.delete(priv);
					}
				return priv;
		}

@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
@DeleteMapping(path ={"deleteRoles/{id}"})
		public Role removeRole(@PathVariable("id") int id) throws ResourceNotFoundException {
			Role rola = rr.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role not found for this id :: " + id));
				if(rola != null){
						rr.delete(rola);
					}
				return rola;
		}

}

