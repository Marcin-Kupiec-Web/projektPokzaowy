package com.marcin.kupiec.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;

@Entity
public class Rejestry {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty(message = "Brak pola: akcja")
    private String akcja;
    @NotEmpty(message = "Brak pola: obiekt")
    private String obiekt;
    @NotEmpty(message = "Brak pola: uzytkownik")
    private String uzytkownik;
    private String uwagi;
  
    @Temporal(TemporalType.TIMESTAMP)
    private Date data;
    public Rejestry() {
    }
	public String getAkcja() {
		return akcja;
	}
	public void setAkcja(String akcja) {
		this.akcja = akcja;
	}
	public String getObiekt() {
		return obiekt;
	}
	public void setObiekt(String obiekt) {
		this.obiekt = obiekt;
	}
	public String getUzytkownik() {
		return uzytkownik;
	}
	public void setUzytkownik(String uzytkownik) {
		this.uzytkownik = uzytkownik;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public String getUwagi() {
		return uwagi;
	}
	public void setUwagi(String uwagi) {
		this.uwagi = uwagi;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}



  

    //getters, setters, toString...
}