package com.marcin.kupiec.logopedia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marcin.kupiec.logopedia.model.Grupa;


@Repository("grupaRepository")
public interface GrupaRepository extends JpaRepository<Grupa, Integer> {
    Grupa findByName(String name);
}
