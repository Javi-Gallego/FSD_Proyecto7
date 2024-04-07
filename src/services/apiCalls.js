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
      throw new Error('Error al subir el archivo');
    }

    const data = await response.json();

    // Restablecer el campo de archivo
    document.getElementById('photo').value = '';
    return (`http://localhost:4000/${data.data}`);
  } catch (error) {
    console.error('Error:', error);
  }
};
