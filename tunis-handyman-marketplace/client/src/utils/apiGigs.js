import { apiClient } from "./index";

// Get featured/trending gigs
export const getFeaturedGigs = async (limit = 6) => {
  try {
    const response = await apiClient.get(
      `/gig/search?featured=true&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching featured gigs:", error);
    throw error;
  }
};

// Get gigs by category
export const getGigsByCategory = async (category) => {
  try {
    const response = await apiClient.get(`/gig/search?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gigs by category:", error);
    throw error;
  }
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("/category/get");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Get gig details
export const getGigDetails = async (gigId) => {
  try {
    const response = await apiClient.get(`/gig/getGigById/${gigId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching gig details:", error);
    throw error;
  }
};

// Search gigs
export const searchGigs = async (query) => {
  try {
    const response = await apiClient.get(`/gig/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching gigs:", error);
    throw error;
  }
};

// Get professional reviews/ratings
export const getProfessionalReviews = async (gigId) => {
  try {
    const response = await apiClient.get(`/gig/getGigById/${gigId}`);
    return response.data.reviews || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Get professionals by specialization
export const getProfessionalsBySpecialization = async (specialization) => {
  try {
    const response = await apiClient.get(
      `/gig/search?specialization=${specialization}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching professionals:", error);
    throw error;
  }
};
