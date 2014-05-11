package com.trendocean.util.mail;

import java.io.File;

public class MailAttachment {

	private String attachmentName;
	private File attachmentFile;
	
	public MailAttachment() {
		
	}
	
	public MailAttachment(String attachmentName, File attachmentFile) {
		this.attachmentName = attachmentName;
		this.attachmentFile = attachmentFile;
	}

	public String getAttachmentName() {
		return attachmentName;
	}
	
	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}
	
	public File getAttachmentFile() {
		return attachmentFile;
	}
	
	public void setAttachmentFile(File attachmentFile) {
		this.attachmentFile = attachmentFile;
	}
	
}
