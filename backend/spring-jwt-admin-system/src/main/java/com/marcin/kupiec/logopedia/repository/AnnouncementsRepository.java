package com.marcin.kupiec.logopedia.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.marcin.kupiec.logopedia.model.Announcements;


@Repository("announcementsRepository")
public interface AnnouncementsRepository extends JpaRepository<Announcements, Long> {
	Announcements findByTitle(String title);
	@Query(value="select * from Announcements u where u.title like %:word% or u.description like %:word%", nativeQuery=true)
	List<Announcements> findByWord(@Param("word") String word);
	
	@Query(value="select * from Announcements u "
						+ "left join announcement_group ag "
						+ "on u.id=ag.announcement_id "
						+ "left join Grupa g "
						+ "on ag.group_id=g.id "
						+ "where g.id= :grupa or u.id_user = :user or g.id is null", nativeQuery=true)
	Optional<List<Announcements>> findAllByUser(@Param("user") Integer user, @Param("grupa") Integer grupa);
	
	@Query(value="select * from Announcements u "
			+ "left join announcement_group ag "
			+ "on u.id=ag.announcement_id "
			+ "left join Grupa g "
			+ "on ag.group_id=g.id "
			+ "where g.id is null", nativeQuery=true)
	Optional<List<Announcements>> findAllNoAuthenticate();
}
 