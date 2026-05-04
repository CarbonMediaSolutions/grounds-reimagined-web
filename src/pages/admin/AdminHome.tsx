import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminNav from "@/components/admin/AdminNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, MessageSquare, Mail, ArrowRight } from "lucide-react";

const POSITIVE_ANSWERS = ["Excellent", "Good", "Yes, absolutely", "Yes"];

const AdminHome = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    posts: 0,
    feedback: 0,
    feedbackPositive: 0,
    feedbackNegative: 0,
    contact: 0,
    contactUnread: 0,
  });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin/login"); return; }
      const { data: roles } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", user.id).eq("role", "admin");
      if (!roles || roles.length === 0) { navigate("/admin/login"); return; }
      setIsAdmin(true);

      const [postsRes, feedbackRes, contactRes] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("feedback_responses").select("*"),
        supabase.from("contact_messages").select("id, read"),
      ]);

      const feedback = feedbackRes.data || [];
      const positive = feedback.filter((r: any) => {
        const answers = [r.overall_experience, r.staff_helpful, r.product_quality, r.store_experience, r.found_everything];
        return answers.filter((a: string) => POSITIVE_ANSWERS.includes(a)).length >= 3;
      }).length;

      const contact = contactRes.data || [];
      setStats({
        posts: postsRes.count || 0,
        feedback: feedback.length,
        feedbackPositive: positive,
        feedbackNegative: feedback.length - positive,
        contact: contact.length,
        contactUnread: contact.filter((c: any) => !c.read).length,
      });
      setLoading(false);
    })();
  }, [navigate]);

  if (!isAdmin || loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">Loading...</div>;
  }

  const tiles = [
    {
      title: "Blog Posts",
      icon: FileText,
      to: "/admin/blogs",
      stat: `${stats.posts}`,
      caption: "total posts",
      extra: null,
    },
    {
      title: "Feedback",
      icon: MessageSquare,
      to: "/admin/feedback",
      stat: `${stats.feedback}`,
      caption: "responses",
      extra: stats.feedback > 0 ? (
        <div className="flex gap-2 mt-3">
          <Badge variant="default">{stats.feedbackPositive} positive</Badge>
          <Badge variant="destructive">{stats.feedbackNegative} negative</Badge>
        </div>
      ) : null,
    },
    {
      title: "Contact Messages",
      icon: Mail,
      to: "/admin/contact",
      stat: `${stats.contact}`,
      caption: "archived",
      extra: (
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="secondary">Archive — form removed</Badge>
          {stats.contactUnread > 0 && (
            <Badge variant="destructive">{stats.contactUnread} unread</Badge>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="py-8">
      <div className="container-wide max-w-6xl mx-auto px-4">
        <AdminNav title="Admin Dashboard" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Card
                key={tile.to}
                className="cursor-pointer hover:shadow-card transition-shadow group"
                onClick={() => navigate(tile.to)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {tile.title}
                  </CardTitle>
                  <Icon className="w-5 h-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{tile.stat}</span>
                    <span className="text-sm text-muted-foreground">{tile.caption}</span>
                  </div>
                  {tile.extra}
                  <div className="flex items-center gap-1 text-sm text-primary mt-4 group-hover:gap-2 transition-all">
                    Open <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
