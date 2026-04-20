import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminNav from "@/components/admin/AdminNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/RichTextEditor";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form state
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [published, setPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  const checkAdminAndLoad = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/login"); return; }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) { navigate("/admin/login"); return; }

    setIsAdmin(true);
    await loadPosts();
  };

  const loadPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setPosts(data);
    setLoading(false);
  };

  const resetForm = () => {
    setEditing(null);
    setShowForm(false);
    setTitle("");
    setContent("");
    setSummary("");
    setPublished(false);
    setImageFile(null);
    setExistingImageUrl(null);
  };

  const editPost = (post: BlogPost) => {
    setEditing(post.id);
    setShowForm(true);
    setTitle(post.title);
    setContent(post.content);
    setSummary(post.summary || "");
    setPublished(post.published);
    setExistingImageUrl(post.image_url);
    setImageFile(null);
  };

  const generateSummary = async () => {
    if (!content.trim()) {
      toast({ title: "Please add content first", variant: "destructive" });
      return;
    }
    setGeneratingSummary(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-summary", {
        body: { content },
      });
      if (error) throw error;
      if (data?.summary) {
        setSummary(data.summary);
        toast({ title: "Summary generated!" });
      }
    } catch (e: any) {
      toast({ title: "Failed to generate summary", description: e.message, variant: "destructive" });
    } finally {
      setGeneratingSummary(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({ title: "Title and content are required", variant: "destructive" });
      return;
    }

    setSaving(true);
    try {
      let image_url = existingImageUrl;
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const postData = {
        title: title.trim(),
        content: content.trim(),
        summary: summary.trim() || null,
        image_url,
        published,
        updated_at: new Date().toISOString(),
      };

      if (editing) {
        const { error } = await supabase.from("blog_posts").update(postData).eq("id", editing);
        if (error) throw error;
        toast({ title: "Post updated!" });
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase.from("blog_posts").insert({
          ...postData,
          author_id: user?.id,
        });
        if (error) throw error;
        toast({ title: "Post created!" });
      }

      resetForm();
      await loadPosts();
    } catch (e: any) {
      toast({ title: "Error saving post", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting post", variant: "destructive" });
    } else {
      toast({ title: "Post deleted" });
      await loadPosts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (!isAdmin || loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="py-8">
      <div className="container-wide max-w-4xl mx-auto px-4">
        <AdminNav
          title="Manage Blog"
          actions={
            !showForm ? (
              <Button onClick={() => { resetForm(); setShowForm(true); }}>
                <Plus className="w-4 h-4 mr-2" /> New Post
              </Button>
            ) : null
          }
        />

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-display tracking-wider uppercase">
                {editing ? "Edit Post" : "New Post"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Write your blog post..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="summary">Summary</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateSummary}
                    disabled={generatingSummary || !content.trim()}
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    {generatingSummary ? "Generating..." : "Auto-generate"}
                  </Button>
                </div>
                <Textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Short summary (auto-generated or manual)"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                {existingImageUrl && !imageFile && (
                  <img src={existingImageUrl} alt="Current" className="w-32 h-20 object-cover rounded mt-2" />
                )}
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={published} onCheckedChange={setPublished} id="published" />
                <Label htmlFor="published">Published</Label>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </Button>
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts list */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No posts yet. Create your first one!</p>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  {post.image_url && (
                    <img src={post.image_url} alt="" className="w-16 h-16 rounded object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(post.created_at), "dd MMM yyyy")} ·{" "}
                      <span className={post.published ? "text-green-600" : "text-amber-600"}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => editPost(post)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deletePost(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
