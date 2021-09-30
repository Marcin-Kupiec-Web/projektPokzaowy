package com.marcin.kupiec.logopedia.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 *
 * @author marec
 */

@Entity
@Table(name = "role")
@NamedQueries({
    @NamedQuery(name = "Role.findAll", query = "SELECT r FROM Role r"),
    @NamedQuery(name = "Role.findById", query = "SELECT r FROM Role r WHERE r.id = :id"),
    @NamedQuery(name = "Role.findByName", query = "SELECT r FROM Role r WHERE r.name = :name")})
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
   
   
    public Role() {
    }
    @NotBlank(message = "Pole jest wymagane!")
    @Size(min=2,max = 255, message="Wpisz co najmniej 2 znaki!")
    @NotNull
    @Column(name = "name")
    private String name;
 
    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
   
    @JsonIgnore
    @ManyToMany(mappedBy = "roleCollection",cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private List<User> userCollection;
    
    @Transient
    private String userCollectionToString;
    
    @Column(name="poziomUprawnien")
    private int poziomUprawnien;
  
    @JoinTable(
        name = "roles_privileges", 
        joinColumns = @JoinColumn(
          name = "role_id", referencedColumnName = "id"), 
          inverseJoinColumns = @JoinColumn(
          name = "privilege_id", referencedColumnName = "id"))
    @ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST,CascadeType.MERGE})
   //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private List<Privilege> privileges;
   
    @Transient
    private String privilegesString;
    
    public Role(Integer id) {
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

    public int getPoziomUprawnien() {
		return poziomUprawnien;
	}

	public void setPoziomUprawnien(int poziomUprawnien) {
		this.poziomUprawnien = poziomUprawnien;
	}

	@Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Role)) {
            return false;
        }
        Role other = (Role) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.demo.Role[ id=" + id + " ]";
    }

	public List<Privilege> getPrivileges() {
		return privileges;
	}

	public void setPrivileges(List<Privilege> privileges) {
		this.privileges = privileges;
	}

	public String getUserCollectionToString() {
		return userCollectionToString;
	}

	public void setUserCollectionToString(String userCollectionToString) {
		this.userCollectionToString = userCollectionToString;
	}

	public String getPrivilegesString() {
		String pstr="";
		for(Privilege pc:this.privileges){
			pstr+=pc.getName()+", ";
		}
		pstr = pstr.substring(0, pstr.length() - 2);
		return pstr;
	}

	public void setPrivilegesString(String privilegesString) {
		this.privilegesString = privilegesString;
	}
    
}
