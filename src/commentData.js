export const createComment = async (text, parentId = null,avatar,username,email,movieId) => {
    return {
        id: Math.random().toString(36).substring(2, 9),
        avatar: avatar,
        body: text,
        email: email,
        parentId,
        username: username,
        movieId: movieId,
        createdAt: new Date().toLocaleString(),
    };
};
export const updateUserComment = async (text) => {
  return { text };
};
export const deleteUserComment = async () => {
    return {};
};
