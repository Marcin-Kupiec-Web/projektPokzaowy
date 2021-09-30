package com.marcin.kupiec.logopedia.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.marcin.kupiec.logopedia.dto.AnnouncementsImagesDTO;
import com.marcin.kupiec.logopedia.exceptions.ImageRetrievalException;
import com.marcin.kupiec.logopedia.exceptions.ResourceNotFoundException;
import com.marcin.kupiec.logopedia.model.Announcements;
import com.marcin.kupiec.logopedia.model.AnnouncementsImages;
import com.marcin.kupiec.logopedia.model.Grupa;
import com.marcin.kupiec.logopedia.model.User;
import com.marcin.kupiec.logopedia.repository.AnnouncementsImagesRepository;
import com.marcin.kupiec.logopedia.repository.AnnouncementsRepository;
import com.marcin.kupiec.logopedia.repository.GrupaRepository;
import com.marcin.kupiec.logopedia.repository.UserRepository;
import com.marcin.kupiec.logopedia.service.FileService;

@RestController
@RequestMapping("/systemApp/restControllerAppAnnouncements")
public class AnnouncementsControlerRest {
	@Autowired
	AnnouncementsRepository announcementsRep;
	@Autowired
	UserRepository usrr;
	@Autowired
	FileService fileService;
	@Autowired
	AnnouncementsImagesRepository air;
	@Autowired
	GrupaRepository grupaRep;
	private List<Announcements> announcementsList;
	
	
	public static String getToken() {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    if(authentication != null)
	    return authentication.getName();
	    return null;
	  } 
	
	@GetMapping(path = "/getAnnouncements")
	    public List<Announcements> getAnnouncements() throws ResourceNotFoundException {
		announcementsList=new ArrayList<Announcements>();
		
		if(getToken()!=null) {
			User us=usrr.findByUsername(getToken()).orElseGet(() -> 
			new User());		
			if(us.getId() !=null)
				announcementsList=announcementsRep.findAllByUser(us.getId(),us.getGrupa().getId()).orElseThrow(
						() -> new ResourceNotFoundException("Nie znaleziono wiadomosci findAllByUser(us.getId())"));
			else
				announcementsList=announcementsRep.findAllNoAuthenticate().orElseThrow(
						() -> new ResourceNotFoundException("Nie znaleziono wiadomosci findAllNoAuthenticate()"));;				
		}
	
		
	        return announcementsList; 
	    }
	
    @GetMapping("/getAnnouncementById/{id}")
    Announcements getAnnouncementById(@PathVariable Long id) throws ResourceNotFoundException {
    	Announcements annu = announcementsRep.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono id :: " + id));
        return annu;
    }
    
    @GetMapping("/getAnnouncementByWord/{word}")
    List<Announcements> getAnnouncementById(@PathVariable String word) throws ResourceNotFoundException {
    	announcementsList=new ArrayList<Announcements>();
    	announcementsList = announcementsRep.findByWord(word);
    	
        return announcementsList;
    }
     
	@PostMapping(path = "/addAnnouncements")
	public Announcements addAnnouncements(@Valid @RequestBody Announcements announcementDetails) throws ResourceNotFoundException {
	if(getToken()!=null) {
		User us=usrr.findByUsername(getToken()).orElseThrow(() -> 
		new ResourceNotFoundException("User not found for this name :: "+getToken()));
		announcementDetails.setUser(us);	
		List<AnnouncementsImages> announcementsImagesCollection = new ArrayList<AnnouncementsImages>();
		announcementDetails.setAnnouncementsImagesCollection(announcementsImagesCollection);
		announcementDetails.setDate(new Date());
		if(announcementDetails.getGroupCollection()!=null)
		{
				List<Grupa> pls=new ArrayList<Grupa>();
				for(Grupa g:announcementDetails.getGroupCollection()) {
					Grupa grSave=grupaRep.findById(g.getId()).orElseThrow(() -> new ResourceNotFoundException("Group not found for this id :: " + g.getId()));
				   pls.add(grSave);
				}
				announcementDetails.setGroupCollection(pls);
		}
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
		announcementSave.setGroupCollection(announcementsDetails.getGroupCollection());
		if(announcementsDetails.getGroupCollection()!=null)
		{
				List<Grupa> pls=new ArrayList<Grupa>();
				for(Grupa g:announcementsDetails.getGroupCollection()) {
					Grupa grSave=grupaRep.findById(g.getId()).orElseThrow(() -> new ResourceNotFoundException("Group not found for this id :: " + g.getId()));
				   pls.add(grSave);
				}
				announcementsDetails.setGroupCollection(pls);
		}
		announcementsRep.save(announcementSave);
		
		return announcementSave;
		}
	
	@DeleteMapping(path ={"/deleteAnnouncements/{id}"})
			public void removeAnnouncements(@PathVariable("id") Long id) throws ResourceNotFoundException {
			
				Announcements anno = announcementsRep.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono id :: " + id));
					if(anno != null){
						announcementsRep.delete(anno);
						}
			}
	
	
	@PostMapping("/files")
	public List<AnnouncementsImages> handleFileUpload(@RequestParam("files[]") MultipartFile file[],
								 @RequestParam("announcementId") String annoId,
								 @RequestParam("alt[]") String alt[],
								 @RequestParam("title[]") String title[],
								 @RequestParam("main[]") Boolean main[],
								 @RequestParam("description[]") String description[]) throws IOException, ImageRetrievalException, NumberFormatException, ResourceNotFoundException {
	
		List<AnnouncementsImages> paiiSaveList = new ArrayList<AnnouncementsImages>();
		
		for(int i = 0; i < file.length; i++) {
			 if(file[i].getContentType().startsWith("image/")){
					AnnouncementsImages paiiSave=new AnnouncementsImages();
					Announcements anno = announcementsRep.findById(Long.parseLong(annoId)).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono id :: " + annoId));
					if(anno != null) {
						paiiSave.setSource(file[i].getBytes());
						paiiSave.setAnnouncement(anno);
						 try {
							 paiiSave.setAlt(alt[i]);
					        } catch(ArrayIndexOutOfBoundsException e) {
					        	paiiSave.setAlt(null);
					        }
						 try {
							 paiiSave.setTitle(title[i]);
					        } catch(ArrayIndexOutOfBoundsException e) {
					        	paiiSave.setTitle(null);
					        }
						 try {
							 paiiSave.setDescription(description[i]);
					        } catch(ArrayIndexOutOfBoundsException e) {
					        	paiiSave.setDescription(null);
					        }
						
						 try {
								if(main[i] == true) {
									for(AnnouncementsImages anni: anno.getAnnouncementsImagesCollection()) {
										anni.setMain(false);
										air.save(anni);
									}
								}
								
								paiiSave.setMain(main[i]);
					        } catch(ArrayIndexOutOfBoundsException e) {
					        	paiiSave.setMain(false);
					        }
						 paiiSave.setFileName(file[i].getOriginalFilename());
						 paiiSave.setFileType(file[i].getContentType());
						air.save(paiiSave);
						paiiSaveList.add(paiiSave);
					}
			}
			 else {
				 throw new IOException("It's not image.");
			}
			
		}
		
	return paiiSaveList;
	}
	
	@DeleteMapping(path ={"/deleteAnnouncementsImage/{id}"})
	public AnnouncementsImages removeAnnouncementsImg(@PathVariable("id") Long id) throws ResourceNotFoundException {
	
		AnnouncementsImages annoImg = air.findById(id).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono id :: " + id));
			if(annoImg != null){
					air.delete(annoImg);
				}
			return annoImg;
	}
	
	@PutMapping (path = {"/updateImgDetails"})
	public void updateDetailsImg(@Valid @RequestBody AnnouncementsImagesDTO announcementsImagesDetails) throws ResourceNotFoundException {
		AnnouncementsImages annoImg = air.findById(announcementsImagesDetails.getId()).orElseThrow(() -> new ResourceNotFoundException("Nie znaleziono id :: " + announcementsImagesDetails.getId()));
		annoImg.setAlt(announcementsImagesDetails.getAlt());
		annoImg.setDescription(announcementsImagesDetails.getDescription());
		if(announcementsImagesDetails.getMain() == true) {
			for(AnnouncementsImages anni: annoImg.getAnnouncement().getAnnouncementsImagesCollection()) {
				anni.setMain(false);
				air.save(anni);
			}
		}
		annoImg.setMain(announcementsImagesDetails.getMain());
		annoImg.setTitle(announcementsImagesDetails.getTitle());
		
		air.save(annoImg);
	}

	}
