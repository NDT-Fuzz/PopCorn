const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: 'fe20e689123b4418f7c51de6dda8db5c',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}
export default apiConfig