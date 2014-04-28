package com.trendocean.security;


public class TrendOceanAuthenticationFilter {
        //extends AbstractAuthenticationProcessingFilter implements AuthenticationEntryPoint {

    /*
	private static final String BLOCK_ERR = "Hatalı Şifre Girişi";

	private static final Logger logger = LogUtil.getLogger();

	private static final String DEFAULT_FILTER_PROCESSES_URL = "/login";

	private static final String POST = "POST";

	@Autowired
	private TrendOceanDetailsService trendOceanDetailsService;


	
	public TrendOceanAuthenticationFilter() {
		super(DEFAULT_FILTER_PROCESSES_URL);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			Authentication authResult) throws IOException, ServletException {
		
	
		String username = "";
		String password = "";
	}

	

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authenticationException) throws IOException, ServletException {

		String username = request.getParameter("username");
		String password = request.getParameter("password");

	}
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		if (username == null || password == null)
			response.sendError(401);
	}


	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {

        String  username = request.getParameter("username");
        String  password = request.getParameter("password");

		Authentication authentication = null;
		try {
			authentication = authenticateForPassword(username, password, request);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new BadCredentialsException(
					"Sunucuya bağlanırken hata oluştu. Lütfen kısa bir süre sonra tekrar deneyiniz.");
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


	private Authentication authenticateForPassword(String username, String password, HttpServletRequest request)
			throws Exception {
		
		TrendOceanAuthentication userAuthentication = new TrendOceanAuthentication();
		try {
			userAuthentication = trendOceanDetailsService.getAuthenticationForPassword(username, password);

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
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException,
			ServletException {
		final HttpServletRequest request = (HttpServletRequest) req;
		final HttpServletResponse response = (HttpServletResponse) res;
		if (request.getMethod().equals(POST)) {
			super.doFilter(request, response, chain);
		} else {
			chain.doFilter(request, response);
		}
	}
	
	
    */

}
