package com.marcin.kupiec.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

@Component
public class FileService {
 

 
	public void storeFile(MultipartFile file) throws IOException {
		   String dir = "/web/img/";

	        File filCreated = new File(dir);

	        // true if the directory was created, false otherwise
	        if (filCreated.mkdirs()) {
	            System.out.println("Directory is created!");
	        } else {
	            System.out.println("Failed to create directory!");
	        }
	     
	        
		try (/*
				Path filePath = Paths.get(FILE_DIRECTORY + "/" + file.getOriginalFilename()); 
				Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
				*/
		FileOutputStream output = new FileOutputStream(filCreated+file.getOriginalFilename())) {
			output.write(file.getBytes());
		}
		   Set<String> listFiles = listFilesUsingDirectoryStream(dir);
	        System.out.println(listFiles.size());

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
	
}