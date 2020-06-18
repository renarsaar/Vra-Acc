import axios from "axios";

export default axios.create({
  baseURL: "https://source.unsplash.com",
  headers: {
    Authorization: "Client-ID JNKMTEx6XiCKF0YuhXpLTCstW3GTYNvewTKhR9h9U20",
  },
});
