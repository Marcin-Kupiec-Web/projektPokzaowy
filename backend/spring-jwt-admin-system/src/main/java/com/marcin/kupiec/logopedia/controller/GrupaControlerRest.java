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
import com.marcin.kupiec.logopedia.model.Grupa;
import com.marcin.kupiec.logopedia.repository.GrupaRepository;


@RestController
@RequestMapping("/systemApp/restControllerAppGrupa")
public class GrupaControlerRest {
	@Autowired
	GrupaRepository grupaRep;
	
	private List<Grupa>grupaList;
	
	@PostAuthorize("hasAnyAuthority('WRITE_PRIVILEGE')")	
	@GetMapping(path = "/getGrups")
	    public List<Grupa> getGrups() {
			grupaList=new ArrayList<Grupa>();
			grupaList=grupaRep.findAll();
	        return grupaList; 
	    }
	
	@GetMapping("/getGroup/{id}")
	Grupa findOne(@PathVariable Integer id) throws ResourceNotFoundException {
	    return grupaRep.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Group not found for this id :: " + id));
	}
	
	@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
	@PostMapping(path = "/addGrups")
	public Grupa addGrups(@Valid @RequestBody Grupa grupaDetails) throws ResourceNotFoundException {
		grupaRep.save(grupaDetails);
	    return grupaDetails; 
	}
	
	@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
	@PutMapping("/updateGrups")
		public Grupa updateGrups(@Valid @RequestBody Grupa grupaDetails) throws ResourceNotFoundException{
		
		Grupa grupaSave= grupaRep.findById(grupaDetails.getId()).orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + grupaDetails.getId()));
		grupaSave.setName(grupaDetails.getName());
		grupaSave.setShortName(grupaDetails.getShortName());
		grupaSave.setDescription(grupaDetails.getDescription());
	
		grupaRep.save(grupaSave);
		
		return grupaSave;
		}
	
	@PostAuthorize("hasAnyAuthority('ONLY_ADMIN_PRIVILEGE')")
	@DeleteMapping(path ={"deleteGrups/{id}"})
			public Grupa removeZaklad(@PathVariable("id") int id) throws ResourceNotFoundException {
				Grupa grupa = grupaRep.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono id :: " + id));
					if(grupa != null){
							grupaRep.delete(grupa);
						}
					return grupa;
			}


}
