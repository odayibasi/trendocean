package com.trendocean.filter;

import com.trendocean.security.TrendOceanAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TrendoceanForwarder implements Filter {

    @Autowired
    SessionRegistry sessionRegistry;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        final HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        final String requestURI = httpServletRequest.getRequestURI();
        if(requestURI.contains("/questions/")){
            request.getRequestDispatcher("/onequestion.xhtml").forward(request, response);
            return;
        }

        if(requestURI.contains("/users/")){
            request.getRequestDispatcher("/profile.html").forward(request, response);
            return;
        }

        if(requestURI.contains("/follows/")){
            request.getRequestDispatcher("/people.html").forward(request, response);
            return;
        }

        if(requestURI.contains("/newfollows/")){
            request.getRequestDispatcher("/newfollowers.html").forward(request, response);
            return;
        }


        if(requestURI.contains("/findfriends/")){
            request.getRequestDispatcher("/trendradar.html").forward(request, response);
            return;
        }


        if(requestURI.contains("/searchs/")){
            request.getRequestDispatcher("/search.html").forward(request, response);
            return;
        }

        chain.doFilter(request, response);

    }

    @Override
    public void destroy() {

    }
}
