package com.marcin.kupiec.logopedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marcin.kupiec.logopedia.model.Announcements;
import com.marcin.kupiec.logopedia.model.AnnouncementsImages;


@Repository("announcementsImagesRepository")
public interface AnnouncementsImagesRepository extends JpaRepository<AnnouncementsImages, Long> {
	Announcements findByFileName(String fileName);
}
