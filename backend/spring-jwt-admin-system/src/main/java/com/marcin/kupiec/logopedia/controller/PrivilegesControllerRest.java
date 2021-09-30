package com.marcin.kupiec.logopedia.controller;

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
import com.marcin.kupiec.logopedia.repository.PrivilegeRepository;

@RestController
@RequestMapping("/systemApp/restControllerAppPrivileges")
public class PrivilegesControllerRest {
	@Autowired
	PrivilegeRepository pr;
	
	@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")	
	@GetMapping(path = "/getPrivileges")
	    public List<Privilege> getPrivileges() {
	        return pr.findAll(); 
	    }

	@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
	@PostMapping(path = "/addPrivileges")
	public Privilege addPrivileges(@Valid @RequestBody Privilege privilegeDetails) throws ResourceNotFoundException {

		pr.save(privilegeDetails);
	    return privilegeDetails; 
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
	@DeleteMapping(path ={"deletePrivileges/{id}"})
			public Privilege removePrivilege(@PathVariable("id") int id) throws ResourceNotFoundException {
				Privilege priv = pr.findById(id).orElseThrow(() -> new ResourceNotFoundException("Privilege not found for this id :: " + id));
					if(priv != null){
							pr.delete(priv);
						}
					return priv;
			}
}
