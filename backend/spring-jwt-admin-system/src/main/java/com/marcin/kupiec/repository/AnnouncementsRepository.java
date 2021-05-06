package com.marcin.kupiec.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marcin.kupiec.model.Announcements;


@Repository("announcementsRepository")
public interface AnnouncementsRepository extends JpaRepository<Announcements, Integer> {
	Announcements findByTitle(String title);
}
