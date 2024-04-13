const rootUrl = "https://rocket-server.up.railway.app/api/";
const rootUrlPhoto = "https://rocket-server.up.railway.app/";
// const rootUrl = "http://localhost:4000/api/";
// const rootUrlPhoto = "http://localhost:4000/";

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

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};

export const updateProfile = async (profile, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  };

  try {
    const response = await fetch(rootUrl + "users/profile", options);

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

    return data.data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};

export const getOwnPosts = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(rootUrl + "posts/own", options);

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

export const handleFormSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(`${rootUrl}upload/`, options);

    if (!response.ok) {
      throw new Error("Error al subir el archivo");
    }

    const data = await response.json();

    // Restablecer el campo de archivo
    document.getElementById("photo").value = "";

    return `${rootUrlPhoto}${data.data}`;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const uploadImagePost = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(`${rootUrl}uploadpost/`, options);

    if (!response.ok) {
      throw new Error("Error al subir el archivo");
    }

    const data = await response.json();

    // Restablecer el campo de archivo
    document.getElementById("photo").value = "";

    return `${rootUrlPhoto}${data.data}`;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deactivateUser = async (token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(rootUrl + "users/deactivate", options);

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

export const createPost = async (post, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  };

  try {
    const response = await fetch(rootUrl + "posts/", options);

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

export const deletePost = async (postId, token) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(rootUrl + "posts/" + postId, options);

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

export const createCommentary = async (comment, id, token) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  };

  try {
    const response = await fetch(rootUrl + "posts/comment", options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.log("createCommentError: " + error);
    return error;
  }
};

export const getUsers = async (query, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    console.log(`${rootUrl}users?${query}`)
    const response = await fetch(`${rootUrl}users?${query}`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    console.log("error1: " + error);
    return error.message;
  }
};

export const getPosts = async (query, token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}posts?${query}`, options);

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

export const followUser = async (userId, token) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    console.log(`${rootUrl}users/follow/${userId}`)
    const response = await fetch(`${rootUrl}users/follow/${userId}`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }
    console.log("data", data.data);
    return data.data;
  } catch (error) {
    console.log("error1: " + error);
    return error;
  }
};