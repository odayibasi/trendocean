package com.trendocean.security;


import com.trendocean.domain.AccountStateEnum;
import com.trendocean.domain.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TrendOceanAuthenticationFilter extends AbstractAuthenticationProcessingFilter implements AuthenticationEntryPoint {


    private static final String DEFAULT_FILTER_PROCESSES_URL = "/login";

    @Autowired
    private TrendOceanDetailsService detailsService;

    @Autowired
    @Qualifier("sessionRegistry")
    private SessionRegistry sessionRegistry;


    public TrendOceanAuthenticationFilter() {
        super(DEFAULT_FILTER_PROCESSES_URL);
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        request.setCharacterEncoding("UTF-8");
        String username = "", password = "";

        if (request.getParameter("username") != null) {
            username = request.getParameter("username");
            password = request.getParameter("password");
        }

        Authentication authentication = null;
        try {
            authentication = authenticateForPassword(username, password, request);
       } catch (Exception e) {
            String errMsg = "Sunucuya bağlanırken hata oluştu. Lütfen kısa bir süre sonra tekrar deneyiniz.";
            if (e.getMessage() != null) {
                errMsg = e.getMessage();
            }
            e.printStackTrace();
            if (e instanceof InsufficientAuthenticationException)
                throw new InsufficientAuthenticationException(errMsg);
            else
                throw new BadCredentialsException(errMsg);
        }
        return authentication;
    }

    private Authentication authenticateForPassword(String username, String password, HttpServletRequest request) throws Exception {
        Profile user = detailsService.getUser(username);

        if (user == null) {
            throw new BadCredentialsException(
                    "Girmiş olduğunuz kullanıcı için üyeliğiniz bulunmamaktadır.");
        } else if (user.getAccountState()!= AccountStateEnum.ACTIVATED) {
            throw new BadCredentialsException(
                    "Üyeliğiniz aktif değildir.");
        }

        TrendOceanAuthentication userAuthentication = new TrendOceanAuthentication();
        try {
            userAuthentication = detailsService.getAuthenticationForPassword(username, password);
        } catch (Exception e) {
            if (e instanceof BadCredentialsException || e instanceof UsernameNotFoundException) {
                throw new BadCredentialsException("Kullanıcı bilgileriniz hatalıdır.Lütfen tekrar deneyiniz.");
            }
        }

        @SuppressWarnings("unchecked")
        List<GrantedAuthority> grantedAuthorities = SecurityContextHolder.getContext().getAuthentication() == null ? new ArrayList<GrantedAuthority>()
                : (List<GrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        userAuthentication.getGrantedAuthorities().addAll(grantedAuthorities);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userAuthentication, password,
                userAuthentication.getGrantedAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException e) throws IOException, ServletException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if (username == null || password == null)
            response.sendError(401);
    }
}
