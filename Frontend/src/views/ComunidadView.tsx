import React, { useState } from 'react';
import type { CommunityPost } from '../types';

export default function ComunidadView({ 
  posts, 
  onLikePost,
  onAddPost 
}: { 
  posts: CommunityPost[]; 
  onLikePost: (postId: string) => void;
  onAddPost: (content: string, photo: string) => void;
}) {
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostPhoto, setNewPostPhoto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onAddPost(newPostContent, newPostPhoto);
      setNewPostContent('');
      setNewPostPhoto('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Comunidad Petuno</h2>
        <p className="text-sm text-petuno-secondary-text mt-1">Conéctate con otros dueños, comparte noticias, consejos y reportes de mascotas en tu vecindario.</p>
      </div>

      {/* Write a Post */}
      <div className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-extrabold text-petuno-purple uppercase tracking-wider">Crear Publicación</h3>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea 
            value={newPostContent}
            onChange={e => setNewPostContent(e.target.value)}
            required
            rows={3}
            placeholder="¿Qué quieres compartir con el vecindario? Ej. Alertas de búsqueda, consejos, paseadores recomendados..."
            className="w-full bg-transparent border border-petuno-border dark:border-petuno-secondary-text/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-petuno-purple transition-all resize-none"
          ></textarea>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {newPostPhoto ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-petuno-border relative group">
                  <img src={newPostPhoto} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setNewPostPhoto('')} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold">X</button>
                </div>
              ) : (
                <label className="flex items-center gap-1 text-xs font-semibold text-petuno-purple hover:underline cursor-pointer">
                  📸 Agregar Foto
                  <input 
                    type="file" accept="image/*" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setNewPostPhoto(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </div>
            
            <button 
              type="submit" disabled={isSubmitting}
              className="bg-petuno-purple hover:bg-petuno-purple-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-petuno-surface dark:bg-dark-surface rounded-2xl border border-petuno-border dark:border-petuno-secondary-text/15 p-6 shadow-sm space-y-4">
            
            {/* Author details */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-petuno-purple/10 text-petuno-purple font-extrabold flex items-center justify-center shadow-inner font-mono">
                {post.authorName[0]}
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  {post.authorName}
                  {post.authorRole && (
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                      post.authorRole.includes('Verificado') 
                        ? 'bg-petuno-mint-light text-petuno-mint' 
                        : 'bg-petuno-background dark:bg-dark-surface-elevated text-petuno-secondary-text dark:text-dark-secondary-text'
                    }`}>
                      {post.authorRole}
                    </span>
                  )}
                </h4>
                <span className="text-[10px] text-petuno-muted">{post.timestamp}</span>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-xs text-petuno-text dark:text-dark-text leading-relaxed whitespace-pre-line">{post.content}</p>

            {post.photo && (
              <div className="max-h-80 w-full rounded-2xl overflow-hidden border border-petuno-border bg-petuno-background">
                <img src={post.photo} alt="Publicación" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Actions footer */}
            <div className="flex items-center gap-6 border-t border-petuno-border/30 dark:border-petuno-secondary-text/10 pt-4 text-xs">
              <button 
                onClick={() => onLikePost(post.id)}
                className={`flex items-center gap-1.5 font-bold transition-colors ${
                  post.likedByUser ? 'text-petuno-coral' : 'text-petuno-secondary-text hover:text-petuno-coral'
                }`}
              >
                ❤️ {post.likes} {post.likes === 1 ? 'Me gusta' : 'Me gustas'}
              </button>
              <button 
                onClick={() => alert('Módulo de comentarios de comunidad en desarrollo...')}
                className="flex items-center gap-1.5 font-bold text-petuno-secondary-text hover:text-petuno-purple transition-colors"
              >
                💬 {post.commentsCount} {post.commentsCount === 1 ? 'Comentario' : 'Comentarios'}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
