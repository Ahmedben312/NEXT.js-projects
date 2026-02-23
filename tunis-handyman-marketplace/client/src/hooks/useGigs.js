import { useEffect, useState, useCallback } from "react";
import {
  getFeaturedGigs,
  getGigsByCategory,
  getAllCategories,
  getGigDetails,
  searchGigs,
  getProfessionalsBySpecialization,
} from "../utils/apiGigs";

/**
 * Hook to fetch featured gigs/professionals
 */
export const useFeaturedGigs = (limit = 6) => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        const data = await getFeaturedGigs(limit);
        setGigs(data.gigs || []);
        setError(null);
      } catch (err) {
        setError(err);
        setGigs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [limit]);

  return { gigs, loading, error };
};

/**
 * Hook to fetch gigs by category
 */
export const useGigsByCategory = (category) => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchGigs = async () => {
      try {
        setLoading(true);
        const data = await getGigsByCategory(category);
        setGigs(data.gigs || []);
        setError(null);
      } catch (err) {
        setError(err);
        setGigs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [category]);

  return { gigs, loading, error };
};

/**
 * Hook to fetch all categories
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(data.categories || data || []);
        setError(null);
      } catch (err) {
        setError(err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

/**
 * Hook to fetch gig details
 */
export const useGigDetails = (gigId) => {
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gigId) return;

    const fetchGig = async () => {
      try {
        setLoading(true);
        const data = await getGigDetails(gigId);
        setGig(data);
        setError(null);
      } catch (err) {
        setError(err);
        setGig(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [gigId]);

  return { gig, loading, error };
};

/**
 * Hook to search gigs
 */
export const useSearchGigs = (query) => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === "") {
      setGigs([]);
      return;
    }

    try {
      setLoading(true);
      const data = await searchGigs(searchQuery);
      setGigs(data.gigs || []);
      setError(null);
    } catch (err) {
      setError(err);
      setGigs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      executeSearch(query);
    }
  }, [query, executeSearch]);

  return { gigs, loading, error, executeSearch };
};

/**
 * Hook to fetch professionals by specialization
 */
export const useProfessionalsBySpecialization = (specialization) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!specialization) return;

    const fetchProfessionals = async () => {
      try {
        setLoading(true);
        const data = await getProfessionalsBySpecialization(specialization);
        setProfessionals(data.gigs || []);
        setError(null);
      } catch (err) {
        setError(err);
        setProfessionals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [specialization]);

  return { professionals, loading, error };
};
