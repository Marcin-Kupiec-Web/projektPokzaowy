package com.marcin.kupiec.logopedia.model;


import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author marec
 */

@Entity
public class Announcements implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
   
    public Announcements() {
    }
    
    @NotBlank(message = "Pole jest wymagane!")
    @Size(min=2,max = 60, message="Wpisz co najmniej 2 znaki!")
    @NotNull
    @Column(name = "title")
    private String title;
    
 
    @Lob
    @Column( length = 50000 )
    private String description;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    
	@ManyToOne
	@JoinColumn(name="id_user")
	private User user;
	
   
    @OneToMany(mappedBy = "announcement",cascade = {CascadeType.PERSIST,CascadeType.MERGE, CascadeType.REMOVE})
    private List<AnnouncementsImages> announcementsImagesCollection;
    
   
    @JoinTable(name = "announcement_group", joinColumns = {
            @JoinColumn(name = "announcement_id", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "group_id", referencedColumnName = "id")})
        @ManyToMany
        //(fetch = FetchType.LAZY)
        //@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
        private List<Grupa> groupCollection;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    } 

	@Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Announcements)) {
            return false;
        }
        Announcements other = (Announcements) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.example.demo.Announcements[ id=" + id + " ]";
    }

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public List<AnnouncementsImages> getAnnouncementsImagesCollection() {
		return announcementsImagesCollection;
	}

	public void setAnnouncementsImagesCollection(List<AnnouncementsImages> announcementsImagesCollection) {
		this.announcementsImagesCollection = announcementsImagesCollection;
	}

	public List<Grupa> getGroupCollection() {
		return groupCollection;
	}

	public void setGroupCollection(List<Grupa> groupCollection) {
		this.groupCollection = groupCollection;
	}
    
	
}
