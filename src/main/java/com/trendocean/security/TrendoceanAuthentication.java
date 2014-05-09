package com.trendocean.security;

import com.trendocean.domain.AccountStateEnum;
import com.trendocean.domain.Profile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class TrendOceanAuthentication implements Serializable, UserDetails {

	private static final long serialVersionUID = 1L;

	private Profile user = new Profile();

	private List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();

	public TrendOceanAuthentication() {
	}

	public Profile getUser() {
		return user;
	}

	public void setUser(Profile user) {
		this.user = user;
	}

	public List<GrantedAuthority> getGrantedAuthorities() {
		return grantedAuthorities;
	}

	public void setGrantedAuthorities(List<GrantedAuthority> grantedAuthorities) {
		this.grantedAuthorities = grantedAuthorities;
	}

	@Override
	public boolean equals(Object obj) {
		if (this.user != null && obj instanceof Profile)
            return this.user.getUsername().equals(((Profile) obj).getUsername());
		else
            return super.equals(obj);
	}

	@Override
	public int hashCode() {
		if (this.user == null)
			return super.hashCode();
		else
			return this.user.getUsername().hashCode();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return grantedAuthorities;
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return user.getAccountState()== AccountStateEnum.ACTIVATED;
	}

	@Override
	public boolean isAccountNonLocked() {
		return user.getAccountState()== AccountStateEnum.ACTIVATED;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return user.getAccountState()== AccountStateEnum.ACTIVATED;
	}

	@Override
	public boolean isEnabled() {
		return user.getAccountState()== AccountStateEnum.ACTIVATED;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}