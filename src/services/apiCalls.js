// const rootUrl = "https://socialnetwork-dev-stbs.2.ie-1.fl0.io/api/";
const rootUrl = "http://localhost:4000/api/";

export const registerMe = async (credentials) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  try {
    const response = await fetch(rootUrl + "auth/register", options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};

export const loginMe = async (credentials) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };

  try {
    const response = await fetch(rootUrl + "auth/login", options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};

export const getProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(rootUrl + "users/profile", options);

    const data = await response.json();
    console.log(data.data);
    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};

export const updateProfile = async (profile, token) => {};

export const getTimeline = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(rootUrl + "posts/timeline", options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }
    console.log("GetTimeline");
    // console.log(data.data)
    return data.data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};

export const likeFunction = async (postId, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {

    const response = await fetch(rootUrl + "posts/like/" + postId, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};
