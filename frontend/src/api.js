export const apiBaseUrl = process.env.REACT_APP_API_PATH === "dev"
    ? "http://localhost:9000"
    : "https://sc-kino-backend.herokuapp.com"

        // (Link der deployten Heroku)