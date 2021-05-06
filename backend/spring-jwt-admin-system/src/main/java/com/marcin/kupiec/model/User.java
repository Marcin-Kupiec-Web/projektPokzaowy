package com.marcin.kupiec.model;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 *
 * @author marec
 */

@Entity
@Table(name = "user", uniqueConstraints={@UniqueConstraint(columnNames={"username"})})

public class User implements Serializable {
	@Type(type = "json")
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    private boolean enabled;
    
    @Size(min=8,max = 255, message="Wpisz co najmniej 8 znaków!")
    @NotBlank(message = "Hasło jest wymagane!")
    @NotNull
    @Column(name = "password")
    private String password;
    
    @NotBlank(message = "Imię jest wymagane!")
    @Size(min=2,max = 255, message="Wpisz co najmniej 2 znaki!")
    @NotNull
    @Column(name = "username")
    private String username;
    
    @Transient
    private String roleCollectionToString;
    
    @Transient
    private String zakladToString;
    
    @Transient
    private String grupaToString;
    
    @JoinTable(name = "user_roles", joinColumns = {
        @JoinColumn(name = "users_id", referencedColumnName = "id")}, inverseJoinColumns = {
        @JoinColumn(name = "roles_id", referencedColumnName = "id")})
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private List<Role> roleCollection;
    
	@ManyToOne
	@JoinColumn(name="id_grupa")
	private Grupa grupa;
	
    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private List<Announcements> announcementsCollection;
	
    public User(String username, String password, String rola) {
    	this.password=password;
    	this.username=username;
    	Role role=new Role();
    	role.setName(rola);
    	role.setPoziomUprawnien(1);
    	roleCollection.add(role);
    }
    public User() {
    }
    public User(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
  
    public List<Role> getRoleCollection() {
        return roleCollection;
    }

    public void setRoleCollection(List<Role> roleCollection) {
        this.roleCollection = roleCollection;
    }

    public List<Announcements> getAnnouncementsCollection() {
		return announcementsCollection;
	}
	public void setAnnouncementsCollection(List<Announcements> announcementsCollection) {
		this.announcementsCollection = announcementsCollection;
	}
	
	@Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof User)) {
            return false;
        }
        User other = (User) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.demo.User[ id=" + id + " ]";
    }
    
	public boolean isEnabled() {
		return enabled;
	}
	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public Grupa getGrupa() {
		return grupa;
	}
	
	public void setGrupa(Grupa grupa) {
		this.grupa = grupa;
	}
	
	public String getRoleCollectionToString() {
		String rcstr="";
		for(Role rc:this.roleCollection){
			rcstr+=rc.getName()+", ";
		}
		rcstr = rcstr.substring(0, rcstr.length() - 2);
		return rcstr;
	}
	
	public void setRoleCollectionToString(String roleCollectionToString) {
		this.roleCollectionToString = roleCollectionToString;
	}
	    
	public void setGrupaToString(String grupaToString) {
		this.grupaToString = grupaToString;
	}
	
	public String getGrupaToString() {
		
		return this.grupa.getName();
	}
}
