package com.trendocean.util;

import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@SuppressWarnings("restriction")
public final class PasswordUtil {
	

	private static PasswordUtil instance;

	
	
	public synchronized String encrypt(String password) {
		try {
			MessageDigest md = null;
			md = MessageDigest.getInstance("SHA-1"); // step 2
			md.update(password.getBytes("UTF-8")); // step 3
			byte raw[] = md.digest(); // step 4
			String hash = (new BASE64Encoder()).encode(raw); // step 5
			return hash; // step 6
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}

	}

	public String SHA1(String text) throws NoSuchAlgorithmException,
			UnsupportedEncodingException {
		MessageDigest md = MessageDigest.getInstance("SHA-1");
		byte[] sha1 = new byte[40];
		md.update(text.getBytes("iso-8859-1"), 0, text.length());
		sha1 = md.digest();
		String base64String = (new BASE64Encoder()).encode(sha1);
		return base64String;
	}

public static synchronized PasswordUtil getInstance() // step 1
	{
		if (instance == null) {
			return new PasswordUtil();
		} else {
			return instance;
		}
	}
}	
	
