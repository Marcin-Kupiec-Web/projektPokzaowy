package com.marcin.kupiec.logopedia.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class AnnouncementsImages {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    
    private String fileName;

    private String fileType;
    
    private Boolean mainImg;

    @Lob
    @Column(nullable = false)
    private byte[] source;
    
    private String alt;
    
    private String title;
    
    private String description;
    
    private Boolean main;
    
//getter and setter
    @JsonIgnore
    @ManyToOne
	@JoinColumn(name="id_announcement")
	private Announcements announcement;
    
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Announcements getAnnouncement() {
		return announcement;
	}

	public void setAnnouncement(Announcements announcement) {
		this.announcement = announcement;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getSource() {
		return source;
	}

	public void setSource(byte[] source) {
		this.source = source;
	}

	public Boolean getMainImg() {
		return mainImg;
	}

	public void setMainImg(Boolean mainImg) {
		this.mainImg = mainImg;
	}

	public String getAlt() {
		return alt;
	}

	public void setAlt(String alt) {
		this.alt = alt;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getMain() {
		return main;
	}

	public void setMain(Boolean main) {
		this.main = main;
	}

}
