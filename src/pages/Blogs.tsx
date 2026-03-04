import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  summary: string | null;
  image_url: string | null;
  created_at: string;
}

const Blogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, summary, image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (!error && data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h1 className="font-display text-4xl md:text-5xl tracking-wider uppercase mb-4">
            Our Blog
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Stories, tips, and recipes from The Grounds family
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-[16/10] bg-muted rounded-t-lg" />
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blogs/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-elevated transition-shadow duration-300 h-full">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full aspect-[16/10] object-cover"
                        loading="lazy"
                      />
                    )}
                    <CardContent className="p-6">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                        {format(new Date(post.created_at), "dd MMMM yyyy")}
                      </p>
                      <h2 className="font-display text-xl tracking-wide uppercase mb-2 text-foreground">
                        {post.title}
                      </h2>
                      {post.summary && (
                        <p className="text-muted-foreground text-sm line-clamp-3">{post.summary}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blogs;
