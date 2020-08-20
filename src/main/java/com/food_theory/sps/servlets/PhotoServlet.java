package com.food_theory.sps.servlets;

import com.food_theory.sps.data.Get;
import com.food_theory.sps.data.ApiKeys;
import com.google.gson.*;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that retrieves pictures from Unsplash for the carousel. */
@WebServlet("/retrieve-photos")
public class PhotoServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String unsplashResponse = Get.sendGET(
      "https://api.unsplash.com/photos/random/?client_id="+ApiKeys.UNSPLASH_KEY+
      "&count=30&orientation=portrait&query=food-cafe-restaurant-cafe"
    );
    Gson gson = new Gson();
    String json = gson.toJson(unsplashResponse);
    response.setStatus(HttpServletResponse.SC_OK);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
}