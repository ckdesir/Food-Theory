package com.food_theory.sps.servlets;

import com.food_theory.sps.data.Get;
import com.food_theory.sps.data.ApiKeys;
import com.google.gson.*;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that retrieves pictures from Pixabay for the carousel. */
@WebServlet("/retrieve-photos")
public class PhotoServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String pixabayResponse = Get.get(
      "https://pixabay.com/api/?key="+ApiKeys.PIXABAY_KEY+"&lang=en&image_type=photo&orientation=vertical&category=food&safesearch=true&per_page=40&q=restaurant+food+dinner"
    );
    Gson gson = new Gson();
    String json = gson.toJson(pixabayResponse);
    response.setStatus(HttpServletResponse.SC_OK);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
}