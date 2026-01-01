import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async ({ page = 1, limit = 12, category, sort, includeYoutube = true } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (category) params.append('category', category);
      if (sort) params.append('sort', sort);
      if (includeYoutube) params.append('includeYoutube', 'true');
      
      const response = await api.get(`/videos?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch videos');
    }
  }
);

export const fetchVideoById = createAsyncThunk(
  'videos/fetchVideoById',
  async ({ videoId, videoType }, { rejectWithValue }) => {
    try {
      let response;
      if (videoType === 'youtube') {
        response = await api.get(`/youtube/video/${videoId}`);
      } else {
        response = await api.get(`/videos/${videoId}`);
      }
      return response.data.video;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch video');
    }
  }
);

export const uploadVideo = createAsyncThunk(
  'videos/uploadVideo',
  async ({ formData, onProgress }, { rejectWithValue }) => {
    try {
      const response = await api.post('/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(progress);
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

export const likeVideo = createAsyncThunk(
  'videos/likeVideo',
  async ({ videoId, videoType }, { rejectWithValue }) => {
    try {
      let response;
      if (videoType === 'youtube') {
        response = await api.post(`/youtube/video/${videoId}/like`);
      } else {
        response = await api.post(`/videos/${videoId}/like`);
      }
      return { videoId, videoType, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like video');
    }
  }
);

export const addComment = createAsyncThunk(
  'videos/addComment',
  async ({ videoId, videoType, comment }, { rejectWithValue }) => {
    try {
      let response;
      if (videoType === 'youtube') {
        response = await api.post(`/youtube/video/${videoId}/comment`, { comment });
      } else {
        response = await api.post(`/videos/${videoId}/comment`, { comment });
      }
      return { videoId, videoType, comment: response.data.comment };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const searchVideos = createAsyncThunk(
  'videos/searchVideos',
  async ({ query, type = 'videos', page = 1, includeYoutube = true }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ q: query, type, page });
      if (includeYoutube) params.append('includeYoutube', 'true');
      
      const response = await api.get(`/search?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed');
    }
  }
);

export const searchYouTubeVideos = createAsyncThunk(
  'videos/searchYouTubeVideos',
  async ({ query, maxResults = 25, pageToken }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ q: query, maxResults });
      if (pageToken) params.append('pageToken', pageToken);
      
      const response = await api.get(`/youtube/search?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'YouTube search failed');
    }
  }
);

export const addYouTubeVideo = createAsyncThunk(
  'videos/addYouTubeVideo',
  async ({ youtubeUrl, youtubeId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/youtube/add', { youtubeUrl, youtubeId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add YouTube video');
    }
  }
);

export const fetchTrendingVideos = createAsyncThunk(
  'videos/fetchTrendingVideos',
  async ({ page = 1, limit = 12, includeYoutube = true } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (includeYoutube) params.append('includeYoutube', 'true');
      
      const response = await api.get(`/search/trending?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending videos');
    }
  }
);

const initialState = {
  videos: [],
  currentVideo: null,
  trendingVideos: [],
  searchResults: null,
  youtubeSearchResults: null,
  pagination: null,
  isLoading: false,
  uploadProgress: 0,
  error: null,
  filters: {
    category: 'all',
    sort: 'createdAt',
    includeYoutube: true,
  },
  youtubeQuota: null,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearCurrentVideo: (state) => {
      state.currentVideo = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = null;
      state.youtubeSearchResults = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    resetUploadProgress: (state) => {
      state.uploadProgress = 0;
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch videos
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videos = action.payload.videos;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch video by ID
      .addCase(fetchVideoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Upload video
      .addCase(uploadVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadProgress = 0;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      })
      
      // Like video
      .addCase(likeVideo.fulfilled, (state, action) => {
        if (state.currentVideo && 
            ((action.payload.videoType === 'youtube' && state.currentVideo.youtubeId === action.payload.videoId) ||
             (action.payload.videoType === 'native' && state.currentVideo._id === action.payload.videoId))) {
          state.currentVideo.liked = action.payload.liked;
          state.currentVideo.likeCount = action.payload.likeCount;
        }
      })
      
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.currentVideo && 
            ((action.payload.videoType === 'youtube' && state.currentVideo.youtubeId === action.payload.videoId) ||
             (action.payload.videoType === 'native' && state.currentVideo._id === action.payload.videoId))) {
          if (!state.currentVideo.comments) {
            state.currentVideo.comments = [];
          }
          state.currentVideo.comments.push(action.payload.comment);
        }
      })
      
      // Search videos
      .addCase(searchVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Search YouTube videos
      .addCase(searchYouTubeVideos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchYouTubeVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.youtubeSearchResults = action.payload;
        state.youtubeQuota = action.payload.quota;
      })
      .addCase(searchYouTubeVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Add YouTube video
      .addCase(addYouTubeVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addYouTubeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add to videos list if it's new
        if (action.payload.video && !state.videos.find(v => 
          v.youtubeId === action.payload.video.youtubeId)) {
          state.videos.unshift(action.payload.video);
        }
      })
      .addCase(addYouTubeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch trending videos
      .addCase(fetchTrendingVideos.fulfilled, (state, action) => {
        state.trendingVideos = action.payload.videos;
      });
  },
});

export const {
  clearCurrentVideo,
  clearSearchResults,
  setFilters,
  clearError,
  resetUploadProgress,
  setUploadProgress,
} = videoSlice.actions;

export default videoSlice.reducer;