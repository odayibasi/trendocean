package com.trendocean.security;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;

import tr.com.tse.ohm.domain.SelfCareUser;
import tr.com.tse.ohm.security.SelfCareAuthentication;

public class SecurityHelper {

	//private static final int DAY_OF_MILISECOND = 1000 * 60 * 60 * 24;

	public synchronized static SelfCareUser getLoggedInUser() {
		SelfCareAuthentication authentication = (SelfCareAuthentication) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		return authentication.getKullanici();
	}

	public synchronized static void updateSifre(String sifre) {
		SelfCareAuthentication authentication = (SelfCareAuthentication) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		authentication.getKullanici().setPassword(sifre);
		authentication.getKullanici().setLastPasswordChangeDate(new Date());
	}

	public synchronized static void updateKullaniciKodu(String kullaniciKodu) {
		SelfCareAuthentication authentication = (SelfCareAuthentication) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		authentication.getKullanici().setUsername(kullaniciKodu);
	}

	public synchronized static boolean isKullaniciGuest() {
		if (SecurityContextHolder.getContext().getAuthentication() == null
				|| SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
			return true;
		}
		return false;
	}

	public synchronized static boolean isSifreDegistirRequired() {

		return false;
	}
	



}
