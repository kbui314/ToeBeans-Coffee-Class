package com.coffeeclass.main.constants;

public class SecurityConstants {

	public static final String SECRET = "SECRET_KEY";
	public static final long EXPIRATION_TIME = 900_000; //15 mins
	public static final String TOKEN_PREFIX = "Bearer";
	public static final String HEADER_STRING = "Authorization";
	public static final String SIGN_UP_URL = "/signup";
	public static final String CONTACT_URL = "/sendform";
	public static final String DASHBOARD_URL = "/dashboard";
}
