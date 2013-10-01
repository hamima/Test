package net.industrialHome.hse.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.springframework.stereotype.Component;


@Component
public class JsonUtil {

	/**
	 * Get list of extjsFilters from request. Transform json data format into
	 * list of extjsFilter objects
	 * 
	 * @param data
	 *            - json data from request
	 * @return list of extjsFilters
	 * @throws JSONException 
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException 
	 */
	@SuppressWarnings("unchecked")
	public List<ExtJSFilter> getExtJSFiltersFromRequest(Object data){

		JSONArray jsonArray = null;
		try {
			jsonArray = new JSONArray(data.toString());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<ExtJSFilter> extjsFilters = new ArrayList<ExtJSFilter>();
		ObjectMapper mapper = new ObjectMapper();
		for(int i=0;i<jsonArray.length();i++){
			try {
				extjsFilters.add(mapper.readValue(jsonArray.get(i).toString(), ExtJSFilter.class));
			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return extjsFilters;
	}

}