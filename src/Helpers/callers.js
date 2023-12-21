import {
  getOptions,
  postOptions,
  deleteOptions,
  editOptions,
} from "@/data/data";

async function getArticles(apiEndPoint) {
  try {
    const response = await fetch(
      `http://localhost:3000/api${apiEndPoint}`,
      getOptions
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not fetch articles!",
      status: 400,
    };
  }
}

async function getAllTags(apiEndPoint = "") {
  try {
    const response = await fetch(
      `http://localhost:3000/api/articleTags` + apiEndPoint,
      getOptions
    );

    const data = await response.json();

    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not fetch article tags!",
      status: 400,
    };
  }
}

async function signInUser(body) {
  try {
    const options = {
      ...postOptions,
      body: JSON.stringify(body),
    };
    const response = await fetch(`http://localhost:3000/api/users`, options);

    const data = await response.json();

    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "User could not signin !",
      status: 400,
    };
  }
}

async function getUser(apiEndPoint) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users` + apiEndPoint,
      getOptions
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "User's session can't store !",
      status: 400,
    };
  }
}

async function editUser(apiEndPoint, body) {
  try {
    const options = {
      ...editOptions,
      body: JSON.stringify(body),
    };
    const response = await fetch(
      `http://localhost:3000/api/users` + apiEndPoint,
      options
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not update user !",
      status: 400,
    };
  }
}

async function postArticle(body) {
  try {
    const options = {
      ...postOptions,
      body: JSON.stringify(body),
    };
    const response = await fetch(`http://localhost:3000/api/articles`, options);

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not post article!",
      status: 400,
    };
  }
}

async function editArticle(apiEndPoint, body) {
  try {
    const options = {
      ...editOptions,
      body: JSON.stringify(body),
    };
    const response = await fetch(
      `http://localhost:3000/api/articles` + apiEndPoint,
      options
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not update article !",
      status: 400,
    };
  }
}

async function deleteArticleById(apiEndPoint) {
  try {
    const options = {
      ...deleteOptions,
    };
    const response = await fetch(
      `http://localhost:3000/api/articles` + apiEndPoint,
      options
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not delete article!",
      status: 400,
    };
  }
}
async function getFollowersAndFollwing(apiEndPoint) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/follows` + apiEndPoint,
      getOptions
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not get follows!",
      status: 500,
    };
  }
}

async function postFollow(body) {
  try {
    const options = {
      ...postOptions,
      body: JSON.stringify(body),
    };
    const response = await fetch(`http://localhost:3000/api/follows`, options);

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not follow!",
      status: 400,
    };
  }
}

async function deleteFollow(apiEndPoint) {
  try {
    const options = {
      ...deleteOptions,
    };
    const response = await fetch(
      `http://localhost:3000/api/follows` + apiEndPoint,
      options
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not unfollow!",
      status: 400,
    };
  }
}

async function getLikeArticlesByUser(apiEndPoint) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/likes` + apiEndPoint,
      getOptions
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not get likes!",
      status: 400,
    };
  }
}

async function postLike(body) {
  try {
    const options = {
      ...postOptions,
      body: JSON.stringify(body),
    };
    const response = await fetch(`http://localhost:3000/api/likes`, options);

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not like!",
      status: 400,
    };
  }
}

async function deleteLike(apiEndPoint) {
  try {
    const options = {
      ...deleteOptions,
    };
    const response = await fetch(
      `http://localhost:3000/api/likes` + apiEndPoint,
      options
    );

    const data = await response.json();
    if (!response.ok) {
      return { ...data, status: response.status };
    }
    return { ...data, status: response.status };
  } catch (error) {
    return {
      message: "Could not dislike!",
      status: 400,
    };
  }
}

export {
  //
  getArticles,
  postArticle,
  deleteArticleById,
  editArticle,

  //
  getAllTags,
  getUser,
  editUser,
  signInUser,

  //
  getFollowersAndFollwing,
  postFollow,
  deleteFollow,

  //
  getLikeArticlesByUser,
  postLike,
  deleteLike,
};
