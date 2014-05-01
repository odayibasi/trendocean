package com.trendocean.security;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import tr.com.tse.distribute.DistributeService;


public class TrendoceanLogoutHandler extends SimpleUrlLogoutSuccessHandler {
		
		@Autowired
		DistributeService distributeService;
	
	   @Override
	    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
	       
		   Map<String,SelfCareAuthenticationWrapper> authMap = distributeService.getDistributedMap(SelfCareAuthenticationFilter.AUTHENTICATION_MAP_NAME);
		   String userName = ((SelfCareAuthentication) authentication.getPrincipal()).getUsername();
		   authMap.remove(userName);
	       super.onLogoutSuccess(request, response, authentication);
	    }

}
