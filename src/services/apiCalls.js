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
