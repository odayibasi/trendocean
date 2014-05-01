package com.trendocean.util;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

public class JSONUtil {
	
	public static <T extends Object> String getObjectAsJsonString(T object) throws JsonGenerationException, JsonMappingException, IOException{
		
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.writeValueAsString(object);
		
	}
	
	

}
