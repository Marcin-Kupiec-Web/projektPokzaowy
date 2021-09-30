package com.marcin.kupiec.logopedia.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcin.kupiec.logopedia.exceptions.ResourceNotFoundException;
import com.marcin.kupiec.logopedia.model.Privilege;
import com.marcin.kupiec.logopedia.model.Role;
import com.marcin.kupiec.logopedia.repository.PrivilegeRepository;
import com.marcin.kupiec.logopedia.repository.RoleRepository;

@RestController
@RequestMapping("/systemApp/restControllerAppRole")
public class RoleControllerRest {
	@Autowired
	RoleRepository rr;
	@Autowired
	PrivilegeRepository pr;
	
	@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")	
	@GetMapping(path = "/getRoles")
	    public UserObjectRest getRoles() {
	    	UserObjectRest urest=new UserObjectRest();
	    	urest.setRlm(rr.findAll());
	    	urest.setPlm(pr.findAll());
	        return urest; 
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
	@DeleteMapping(path ={"deleteRoles/{id}"})
			public Role removeRole(@PathVariable("id") int id) throws ResourceNotFoundException {
				Role rola = rr.findById(id).orElseThrow(() -> new ResourceNotFoundException("Role not found for this id :: " + id));
					if(rola != null){
							rr.delete(rola);
						}
					return rola;
			}
	
}
