package com.marcin.kupiec.logopedia.model;


import java.io.Serializable;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 *
 * @author marec
 */

@Entity
@Table(name = "Grupa")
@NamedQueries({
    @NamedQuery(name = "Grupa.findAll", query = "SELECT r FROM Grupa r"),
    @NamedQuery(name = "Grupa.findById", query = "SELECT r FROM Grupa r WHERE r.id = :id"),
    @NamedQuery(name = "Grupa.findByName", query = "SELECT r FROM Grupa r WHERE r.name = :name")})
public class Grupa implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
   
    public Grupa() {
    }
    @NotBlank(message = "Pole jest wymagane!")
    @Size(min=2,max = 255, message="Wpisz co najmniej 2 znaki!")
    @NotNull
    @Column(name = "name",unique=true)
    private String name;
 
    private String shortName;
    
    private String description;
    
    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
   
    @JsonIgnore
    @OneToMany(mappedBy = "grupa")
    private List<User> userCollection;

    @JsonIgnore
    @ManyToMany(mappedBy = "groupCollection")

    private List<Announcements> annouoncementCollection;
    
    public Grupa(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

 
    public List<User> getUserCollection() {
        return userCollection;
    }

    public void setUserCollection(List<User> userCollection) {
        this.userCollection = userCollection;
    }


	@Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Grupa)) {
            return false;
        }
        Grupa other = (Grupa) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.demo.Grupa[ id=" + id + " ]";
    }

	public String getShortName() {
		return shortName;
	}

	public void setShortName(String shortName) {
		this.shortName = shortName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Announcements> getAnnouoncementCollection() {
		return annouoncementCollection;
	}

	public void setAnnouoncementCollection(List<Announcements> annouoncementCollection) {
		this.annouoncementCollection = annouoncementCollection;
	}
    
}
