import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface Post {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, summary, content, image_url, created_at")
        .eq("id", id)
        .eq("published", true)
        .single();

      if (!error && data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container-wide py-20">
        <div className="max-w-3xl mx-auto animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/2" />
          <div className="aspect-[16/9] bg-muted rounded-2xl" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-wide py-20 text-center">
        <h1 className="font-display text-3xl mb-4">Post Not Found</h1>
        <Link to="/blogs" className="text-primary hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12">
      <div className="container-wide max-w-3xl mx-auto">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
          {format(new Date(post.created_at), "dd MMMM yyyy")}
        </p>

        <h1 className="font-display text-3xl md:text-4xl tracking-wider uppercase mb-6">
          {post.title}
        </h1>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-elevated mb-8"
          />
        )}

        <div className="prose prose-stone max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
