package com.marcin.kupiec.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marcin.kupiec.exceptions.ResourceNotFoundException;
import com.marcin.kupiec.model.Announcements;
import com.marcin.kupiec.model.User;
import com.marcin.kupiec.repository.AnnouncementsRepository;
import com.marcin.kupiec.repository.UserRepository;


@RestController
@RequestMapping("/systemApp/restControllerAppAnnouncements")
public class AnnouncementsControlerRest {
	@Autowired
	AnnouncementsRepository announcementsRep;
	@Autowired
	UserRepository usrr;
	
	private List<Announcements> announcementsList;
	
	@GetMapping(path = "/getAnnouncements")
	    public List<Announcements> getAnnouncements() {
			announcementsList=new ArrayList<Announcements>();
			announcementsList=announcementsRep.findAll();
	        return announcementsList; 
	    }
	
	@PostMapping(path = "/addAnnouncements")
	public Announcements addAnnouncements(@Valid @RequestBody Announcements announcementDetails) throws ResourceNotFoundException {
	if(getToken()!=null) {
		User us=Optional.of(usrr.findByUsername(getToken())).orElseThrow(() -> 
		new ResourceNotFoundException("User not found for this name :: "+getToken()));
		announcementDetails.setUser(us);
		announcementDetails.setDate(new Date());
		announcementsRep.save(announcementDetails);
		}
	    return announcementDetails; 
	}
	
	@PutMapping("/updateAnnouncements")
		public Announcements updateAnnouncements(@Valid @RequestBody Announcements announcementsDetails) throws ResourceNotFoundException{
		
		Announcements announcementSave=announcementsRep.findById(announcementsDetails.getId()).orElseThrow(() -> 
			new ResourceNotFoundException("Announcement not found for this id :: " + announcementsDetails.getId()));
		announcementSave.setTitle(announcementsDetails.getTitle());
		announcementSave.setDescription(announcementsDetails.getDescription());
		announcementSave.setDate(new Date());
		announcementsRep.save(announcementSave);
		
		return announcementSave;
		}
	
	@DeleteMapping(path ={"/deleteAnnouncements/{id}"})
			public Announcements removeAnnouncements(@PathVariable("id") int id) throws ResourceNotFoundException {
			
				Announcements anno = announcementsRep.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono id :: " + id));
					if(anno != null){
						announcementsRep.delete(anno);
						}
					return anno;
			}
	
	public static String getToken() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    if(authentication != null)
	    return authentication.getName();
	    return null;
	  }
}

