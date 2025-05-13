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

export const fetchAllVideos = async (page = 1, limit = 6,search="") => {
  const response = await api.get(`/api/videos?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

export const fetchBlogs = async (page=1 ,limit=6,category="",search="")=>{
  const response = await api.get(`/api/blogs?page=${page}&limit=${limit}&category=${category}&search=${search}`);
  return response?.data;
}

export const getSingleBlog = async (id:string)=>{
  const response = await api.get(`/api/blogs/${id}`)
  return response?.data;
}


