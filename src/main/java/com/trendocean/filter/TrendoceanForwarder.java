package com.trendocean.filter;

import com.trendocean.security.TrendOceanAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;

import javax.servlet.*;
import java.io.IOException;
import java.util.List;

public class TrendoceanForwarder implements Filter {

    @Autowired
    SessionRegistry sessionRegistry;


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {


        List<Object> principals = sessionRegistry.getAllPrincipals();
        //IMPLEMENTED FOR GETTING ALL USERS.
        for (Object principal: principals) {
            if (principal instanceof TrendOceanAuthentication) {
                System.out.println(((TrendOceanAuthentication) principal).getUser().getUsername());
            }
        }
        chain.doFilter(request, response);

    }

    @Override
    public void destroy() {

    }
}
