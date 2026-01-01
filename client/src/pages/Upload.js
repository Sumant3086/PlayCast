import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { 
  CloudArrowUpIcon, 
  VideoCameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { uploadVideo, resetUploadProgress } from '../store/slices/videoSlice';
import toast from 'react-hot-toast';

const Upload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, uploadProgress } = useSelector((state) => state.videos);

  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    visibility: 'public',
    category: 'other',
  });
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'education', name: 'Education' },
    { id: 'music', name: 'Music' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'news', name: 'News' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
    { id: 'other', name: 'Other' },
  ];

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      if (!formData.title) {
        setFormData(prev => ({
          ...prev,
          title: file.name.replace(/\.[^/.]+$/, '') // Remove file extension
        }));
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.webm']
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    dispatch(resetUploadProgress());
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a video file');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('video', selectedFile);
    uploadFormData.append('title', formData.title.trim());
    uploadFormData.append('description', formData.description.trim());
    uploadFormData.append('tags', JSON.stringify(
      formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    ));
    uploadFormData.append('visibility', formData.visibility);
    uploadFormData.append('category', formData.category);

    try {
      await dispatch(uploadVideo({
        formData: uploadFormData,
        onProgress: (progress) => {
          // Progress is handled by the slice
        }
      })).unwrap();

      toast.success('Video uploaded successfully!');
      // Redirect to the uploaded video or profile
      navigate('/profile');
    } catch (error) {
      toast.error(error || 'Upload failed');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '32px' }}>
      <div className="mb-8">
        <h1 className="text-primary" style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
          Upload Video
        </h1>
        <p className="text-secondary">
          Share your creativity with the world
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* File Upload */}
        <div className="card p-6">
          <h2 className="text-primary mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
            Select Video File
          </h2>
          
          {!selectedFile ? (
            <div
              {...getRootProps()}
              className={`card p-8 text-center cursor-pointer ${
                isDragActive || dragActive
                  ? 'border-accent'
                  : ''
              }`}
              style={{ 
                border: '2px dashed #2A2A2A',
                borderColor: isDragActive || dragActive ? '#FF4747' : '#2A2A2A'
              }}
            >
              <input {...getInputProps()} />
              <CloudArrowUpIcon className="w-12 h-12 text-secondary mx-auto mb-4" />
              <p className="text-primary mb-2" style={{ fontSize: '18px', fontWeight: '500' }}>
                Drop your video here, or click to browse
              </p>
              <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>
                Supports MP4, AVI, MOV, MKV, WebM (Max 2GB)
              </p>
              <button
                type="button"
                className="btn btn-primary"
              >
                Choose File
              </button>
            </div>
          ) : (
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <VideoCameraIcon className="w-8 h-8 text-accent" />
                  <div>
                    <p className="text-primary" style={{ fontWeight: '500' }}>
                      {selectedFile.name}
                    </p>
                    <p className="text-secondary" style={{ fontSize: '14px' }}>
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="btn-icon"
                  style={{ color: '#FF4747' }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              {uploadProgress > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div className="flex justify-between text-secondary mb-1" style={{ fontSize: '14px' }}>
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#2A2A2A', borderRadius: '4px', height: '8px' }}>
                    <div
                      style={{ 
                        backgroundColor: '#FF4747', 
                        height: '8px', 
                        borderRadius: '4px',
                        width: `${uploadProgress}%`,
                        transition: 'width 0.3s'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Video Details */}
        <div className="card p-6">
          <h2 className="text-primary mb-4" style={{ fontSize: '20px', fontWeight: '600' }}>
            Video Details
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="title" className="label">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter video title"
                maxLength={100}
              />
              <p className="text-secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
                {formData.title.length}/100 characters
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="input-field"
                style={{ resize: 'none' }}
                placeholder="Tell viewers about your video"
                maxLength={5000}
              />
              <p className="text-secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
                {formData.description.length}/5000 characters
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="tags" className="label">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter tags separated by commas (e.g., music, tutorial, fun)"
              />
              <p className="text-secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
                Separate tags with commas to help people find your video
              </p>
            </div>

            <div className="grid grid-2" style={{ gap: '24px' }}>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="visibility" className="label">
                  Visibility
                </label>
                <select
                  id="visibility"
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !selectedFile}
            className="btn btn-primary"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="spinner-icon" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
                Uploading...
              </div>
            ) : (
              'Upload Video'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;