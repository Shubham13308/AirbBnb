export const fetchProperties = (category = "", search = "", country = "", user = "") => async (dispatch) => {
  dispatch({ type: "FETCH_PROPERTIES_REQUEST" });

  try {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (search) query.append("search", search);
    if (country) query.append("country", country);
    if (user) query.append("user", user);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch(`/api/property/fetch?${query.toString()}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const result = await res.json();


    if (res.ok) {
      dispatch({
        type: "FETCH_PROPERTIES_SUCCESS",
        payload: {
          properties: result.data || [],
          favourites: result.favourites || [],
          user: result.decodedUser || null,
        },
      });
    } else {
      dispatch({
        type: "FETCH_PROPERTIES_FAILURE",
        payload: result.message || "Failed to fetch properties",
      });
    }
  } catch (error) {
    console.error("Fetch properties failed:", error);
    dispatch({ type: "FETCH_PROPERTIES_FAILURE", payload: error.message });
  }
};
