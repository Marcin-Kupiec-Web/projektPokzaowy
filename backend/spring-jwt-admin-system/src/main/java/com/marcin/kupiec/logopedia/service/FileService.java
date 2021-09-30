package com.marcin.kupiec.logopedia.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.marcin.kupiec.logopedia.exceptions.ImageRetrievalException;

@Component
public class FileService {
 
	 private static final Logger LOG = LoggerFactory.getLogger(FileService.class);
	    @Value("${announcements.files.base.path}")
	    private String announcementFilesBasePath;

	    @Value("${max.file.upload.size}")
	    private Long maxFileUploadSize;
	    
	public void storeFile(MultipartFile file, int id) throws IOException {
			
		   saveFile(file,id);
		
	}
	
	public Set<String> listFilesUsingDirectoryStream(String dir) throws IOException {
	    Set<String> fileList = new HashSet<>();
	    try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(dir))) {
	        for (Path path : stream) {
	            if (!Files.isDirectory(path)) {
	                fileList.add(path.getFileName()
	                    .toString());
	            }
	        }
	    }
	    return fileList;
	}
	
    private void createDirectoryIfItDoesntExist(String dir) {
    	
        final Path path = Paths.get(dir);
        
        if (Files.notExists(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException ie) {
                LOG.error("Problem creating directory " + dir);
            }
        } 
    }
    
    public String getRootLocationForAnnouncementrUpload(int id) {
        if (id==0) throw new IllegalArgumentException("No user id!");
        
        StringBuilder builder = new StringBuilder();
        
        builder.append(announcementFilesBasePath);
        builder.append("/");
        builder.append(id);
        
        String location = builder.toString();
        
        createDirectoryIfItDoesntExist(location);
        
        return location;
    }
    
    
    public void saveFile(MultipartFile file, int id) throws FileNotFoundException, IOException {
    			
    	String dir = getRootLocationForAnnouncementrUpload(id);
		      		        
			try (
			FileOutputStream output = new FileOutputStream(dir+"/"+file.getOriginalFilename())) {
				output.write(file.getBytes());
			}
    }
    
    public Path fetchPhotoAnnouncementId(int id) throws ImageRetrievalException {
        Path imagePath = null;
        
        Path rootLocation = Paths.get(getRootLocationForAnnouncementrUpload(id));
        LOG.debug("Fetching profile image from " + rootLocation.toString());

        try {
            if (rootLocation.toFile().exists()) {
                Iterator<Path> iterator = Files.newDirectoryStream(rootLocation).iterator();
                
                if (iterator.hasNext()) {
                    imagePath = iterator.next();      
                    
                    LOG.debug("File name is " + imagePath);
                }            
            }
        } catch (IOException ie) {
            throw new ImageRetrievalException(ie.getMessage());
        }
       
        return imagePath;
    }
	
}