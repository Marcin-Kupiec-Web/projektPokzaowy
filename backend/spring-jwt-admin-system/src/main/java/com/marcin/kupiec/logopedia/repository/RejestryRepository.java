package com.marcin.kupiec.logopedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.marcin.kupiec.logopedia.model.Rejestry;

@Repository("rejestryRepository")
public interface RejestryRepository extends JpaRepository<Rejestry, Long>{
	Rejestry findByAkcja(String akcja);
}

