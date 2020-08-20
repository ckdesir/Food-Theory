package com.food_theory.sps.data;

import java.net.*;
import java.io.*;

/**
 * Class that frames a basic get request for Java 8.
 */
public class Get {
  
  private Get() {}

  /**
   * Executes a GET request on the target url.
   * @param {String} targetURL - the URL the GET request is sent to.
   */
  public static String sendGET(String targetURL) throws IOException {
		URL obj = new URL(targetURL);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.setRequestMethod("GET");
		int responseCode = con.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK) { 
			BufferedReader in = new BufferedReader(new InputStreamReader(
					con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();
      return response.toString();
		} else {
			return null;
		}
	}
}