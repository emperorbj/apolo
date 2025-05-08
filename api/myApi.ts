import api from "./axios"

export const fetchVideos = async ()=> {
    // Fetch new videos
  const newVideosResponse = await api.get('/api/videos?latest=new');
  // Fetch old videos (assuming backend supports latest=old)
  const oldVideosResponse = await api.get('/api/videos?latest=old');


  return {
    newVideos: newVideosResponse.data.videos,
    oldVideos: oldVideosResponse.data.videos,
  };
}

export const fetchAllVideos = async (page = 1, limit = 6) => {
  const response = await api.get(`/api/videos?page=${page}&limit=${limit}`);
  return response.data;
};

export const fetchBlogs = async (page=1 ,limit=6,category="")=>{
  const response = await api.get(`/api/blogs?page=${page}&limit=${limit}&category=${category}`);
  return response?.data;
}
