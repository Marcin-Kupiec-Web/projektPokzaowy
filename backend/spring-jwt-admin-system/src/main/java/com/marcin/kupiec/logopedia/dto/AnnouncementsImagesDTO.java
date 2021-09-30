package com.marcin.kupiec.logopedia.dto;

public class AnnouncementsImagesDTO {
private Long id;
private String alt;
private String title;
private String description;
private Boolean main;



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

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}
}
