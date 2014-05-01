package com.trendocean.security;

import com.trendocean.domain.Profile;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityHelper {


	public synchronized static Profile getLoggedInUser() {
		TrendOceanAuthentication authentication = (TrendOceanAuthentication) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		return authentication.getUser();
	}

}
