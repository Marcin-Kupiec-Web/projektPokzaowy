package com.marcin.kupiec.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.marcin.kupiec.exceptions.RejestrNotFoundException;
import com.marcin.kupiec.model.Rejestry;
import com.marcin.kupiec.repository.RejestryRepository;

@RestController
@RequestMapping("/terminarz/restControllerAppRejestry")
public class RejestryControllerRest {

    @Autowired
    private RejestryRepository repository;

    // Find
    @GetMapping("/getRejestrs")
    List<Rejestry> findAll() {
        return repository.findAll();
    }

    @PostMapping("/saveRejestr")
    Rejestry newRejestr(@RequestBody Rejestry newRejestr) {
    	newRejestr.setData(new Date());
        return repository.save(newRejestr);
    }

    // Find 
    @GetMapping("/findRejestr/{id}")
    Rejestry findOne(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RejestrNotFoundException(id));
    }

    // Save or update
    @PutMapping("/books/{id}")
    Rejestry saveOrUpdate(@RequestBody Rejestry newRejestr, @PathVariable Long id) {

        return repository.findById(id)
                .map(x -> {
                    x.setAkcja(newRejestr.getAkcja());
                    x.setData(newRejestr.getData());
                    x.setObiekt(newRejestr.getObiekt());
                    return repository.save(x);
                })
                .orElseGet(() -> {
                    newRejestr.setId(id);
                    return repository.save(newRejestr);
                });
    }
}
