package com.marcin.kupiec.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@NamedQueries({
    @NamedQuery(name = "Privilege.findAll", query = "SELECT p FROM Privilege p"),
    @NamedQuery(name = "Privilege.findById", query = "SELECT p FROM Privilege p WHERE p.id = :id"),
    @NamedQuery(name = "Privilege.findByName", query = "SELECT p FROM Privilege p WHERE p.name = :name")})

public class Privilege implements Serializable{
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

		@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Integer id;
	 
		private String name;
		
		//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
		@JsonIgnore
	    @ManyToMany(mappedBy = "privileges",cascade = {CascadeType.PERSIST,CascadeType.MERGE})
	    private List<Role> roles;
	    
		public Privilege(String name){
			this.name=name;
		}
		 public Privilege() {
		    }

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
	    public Integer getId() {
		return id;
	}

		public void setId(Integer id) {
			this.id = id;
		}
	
		public List<Role> getRoles() {
			return roles;
		}
	
		public void setRoles(List<Role> roles) {
			this.roles = roles;
		}
}
