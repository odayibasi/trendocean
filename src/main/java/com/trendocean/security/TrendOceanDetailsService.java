package com.trendocean.security;

import com.trendocean.domain.Profile;
import com.trendocean.service.db.IUserDBService;
import com.trendocean.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("toUserDetailsService")
public class TrendOceanDetailsService implements UserDetailsService {
	
	@Autowired
	private IUserDBService userDBService;


	public TrendOceanDetailsService() {
		super();
	}
	
	public TrendOceanAuthentication getAuthenticationForPassword(String username, String password) throws Exception {

		String encrypted = PasswordUtil.getInstance().encrypt(password);

		Profile user = userDBService.getUserWithUsername(username);
		
		if (user == null)
			throw new UsernameNotFoundException(
					"Kullanıcı bulanamadı.");
		if (!encrypted.equals(user.getPassword()))
			throw new BadCredentialsException("Girmiş olduğunuz bilgiler hatalıdır");

		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));

		TrendOceanAuthentication userAuthantication = new TrendOceanAuthentication();
		userAuthantication.setUser(user);
		userAuthantication.setGrantedAuthorities(grantedAuthorities);

		return userAuthantication;
	}


	@Override
	public UserDetails loadUserByUsername(String username)	throws UsernameNotFoundException {
		return null;
	}

	public Profile getUser(String username) throws Exception {
		return userDBService.getUserWithUsername(username);
	}


}
