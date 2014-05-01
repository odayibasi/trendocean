package com.trendocean.security;

import com.trendocean.TrendoceanResponse;
import com.trendocean.domain.AccountStateEnum;
import com.trendocean.domain.Profile;
import com.trendocean.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TrendOceanAuthenticationFilter extends AbstractAuthenticationProcessingFilter implements AuthenticationEntryPoint {

    private static final String BLOCK_ERR = "Hatalı Şifre Girişi";

    @Autowired
    private TrendoceanUserDetailsService detailsService;

    private static final String DEFAULT_FILTER_PROCESSES_URL = "/login";

    public TrendOceanAuthenticationFilter() {
        super(DEFAULT_FILTER_PROCESSES_URL);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            Authentication authResult) throws IOException, ServletException {

        TrendoceanResponse respData=new TrendoceanResponse.Builder().setSuccess(true).setCode("00").setDesc("Login success").build();
        returnJsonResponse(request,response,respData);
    }



    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException authenticationException) throws IOException, ServletException {

       TrendoceanResponse respData=new TrendoceanResponse.Builder().setSuccess(false).setCode(BLOCK_ERR).setDesc(authenticationException.getMessage()).build();
       returnJsonResponse(request,response,respData);
    }


    private void returnJsonResponse(HttpServletRequest request, HttpServletResponse response,TrendoceanResponse respData)
            throws UnsupportedEncodingException, IOException {

        HttpServletResponseWrapper responseWrapper = new HttpServletResponseWrapper(response);
        responseWrapper.setContentType("application/json;charset=UTF-8");
        String jsonContent = JSONUtil.getObjectAsJsonString(respData);
        responseWrapper.setHeader("Content-length", jsonContent.getBytes("UTF-8").length + "");
        response.getWriter().print(jsonContent);
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
        } catch (SQLException e) {
            e.printStackTrace();
            throw new BadCredentialsException("Sunucuya bağlanırken hata oluştu. Lütfen kısa bir süre sonra tekrar deneyiniz.");
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

        //We need to implement captcha logic in here

        if ((username == null || username.length() == 0) && (password == null || password.length() == 0)) {
            throw new BadCredentialsException("Kullanıcı kodu ve parola alanı boş bırakılmamalıdır.");
        }

        if (password == null || password.length() == 0) {
            throw new BadCredentialsException("Şifre Alanı Zorunludur.");
        }

        Profile user = detailsService.getUser(username);

        if (user == null) {
            throw new BadCredentialsException("Girmiş olduğunuz kullanıcı için üyeliğiniz bulunmamaktadır.");
        } else if (user.getAccountState()== AccountStateEnum.WAITING_ACTIVATION) {
            throw new BadCredentialsException("Üyeliğiniz aktif değildir.");
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
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if (username == null || password == null)
            response.sendError(401);
    }
}
