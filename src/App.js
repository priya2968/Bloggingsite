import React, { useState } from 'react';
import { Share2, Copy, X } from 'lucide-react';

const ShareDialog = ({ isOpen, onClose, postId }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://your-blog-url.netlify.app/post/${postId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Share this post</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center border rounded p-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-grow mr-2 outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center"
          >
            {copied ? 'Copied!' : <><Copy size={16} className="mr-1" /> Copy</>}
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogPost = ({ post, onLike, onShare }) => (
  <div className="mb-8 bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
    <p className="text-gray-700 mb-4">{post.content}</p>
    <div className="flex space-x-4">
      <button onClick={() => onLike(post.id)} className="flex items-center text-gray-600 hover:text-red-500">
        ❤️ {post.likes}
      </button>
      <button className="flex items-center text-gray-600">
        💬 {post.comments}
      </button>
      <button onClick={() => onShare(post.id)} className="flex items-center text-gray-600 hover:text-blue-500">
        <Share2 size={18} className="mr-1" /> Share
      </button>
    </div>
  </div>
);

const BlogSite = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Welcome to My Netlify Blog', content: 'This is my first post on my new blog hosted on Netlify!', likes: 5, comments: 2 },
    { id: 2, title: 'The Joy of Blogging', content: 'Blogging is a great way to share your thoughts with the world.', likes: 3, comments: 1 },
  ]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  const handleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleShare = (id) => {
    setActivePostId(id);
    setShareDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">My Netlify Blog</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-8 hover:bg-green-600 transition duration-300">
          New Post
        </button>
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} onLike={handleLike} onShare={handleShare} />
        ))}
      </div>
      <ShareDialog
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        postId={activePostId}
      />
    </div>
  );
};

export default BlogSite;