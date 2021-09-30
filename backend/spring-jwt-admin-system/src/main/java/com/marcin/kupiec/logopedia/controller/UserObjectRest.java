package com.marcin.kupiec.logopedia.controller;

import java.util.List;

import com.marcin.kupiec.logopedia.model.Privilege;
import com.marcin.kupiec.logopedia.model.Role;
import com.marcin.kupiec.logopedia.model.User;


public class UserObjectRest {
	
	private List<User> usersList;
	private List<Role> rlm;
	private List<Privilege> plm;
	
	public void setUsersList(List<User> usersList) {
		this.usersList = usersList;
	}

	public List<User> getUsersList() {
	return usersList;
	}
	public List<Role> getRlm() {
		return rlm;
	}
	public void setRlm(List<Role> rlm) {
		this.rlm = rlm;
	}

	public List<Privilege> getPlm() {
		return plm;
	}

	public void setPlm(List<Privilege> plm) {
		this.plm = plm;
	}
}
