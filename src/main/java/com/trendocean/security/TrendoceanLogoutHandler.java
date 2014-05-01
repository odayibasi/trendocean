package com.trendocean.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class TrendoceanLogoutHandler extends SimpleUrlLogoutSuccessHandler {


	   @Override
	    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

           Cookie[] allCookies = request.getCookies();
           for (int i = 0; i < allCookies.length; i++)
           {
               String name = allCookies[i].getName();
               Cookie cookieToDelete = allCookies[i];
               cookieToDelete.setValue("");
               cookieToDelete.setMaxAge(0);
               cookieToDelete.setVersion(0);
               cookieToDelete.setPath("/");
               response.addCookie(cookieToDelete);
           }
           super.onLogoutSuccess(request, response, authentication);
	    }

}
