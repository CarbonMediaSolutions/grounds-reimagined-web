import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogOut, ArrowLeft, Download, MessageSquare, ThumbsUp, ThumbsDown, Phone } from "lucide-react";
import { format } from "date-fns";

interface FeedbackRow {
  id: string;
  created_at: string;
  overall_experience: string;
  staff_helpful: string;
  product_quality: string;
  store_experience: string;
  found_everything: string;
  email: string | null;
  phone: string | null;
}

const POSITIVE_ANSWERS = ["Excellent", "Good", "Yes, absolutely", "Yes"];

const isPositiveResponse = (row: FeedbackRow) => {
  const answers = [row.overall_experience, row.staff_helpful, row.product_quality, row.store_experience, row.found_everything];
  return answers.filter((a) => POSITIVE_ANSWERS.includes(a)).length >= 3;
};

const FeedbackAdmin = () => {
  const [responses, setResponses] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  useEffect(() => {
    if (isAdmin) loadResponses();
  }, [dateFilter, isAdmin]);

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
  };

  const loadResponses = async () => {
    setLoading(true);
    let query = supabase.from("feedback_responses").select("*").order("created_at", { ascending: false });

    if (dateFilter === "7") {
      const d = new Date(); d.setDate(d.getDate() - 7);
      query = query.gte("created_at", d.toISOString());
    } else if (dateFilter === "30") {
      const d = new Date(); d.setDate(d.getDate() - 30);
      query = query.gte("created_at", d.toISOString());
    }

    const { data, error } = await query;
    if (error) {
      toast({ title: "Error loading feedback", description: error.message, variant: "destructive" });
    } else {
      setResponses(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const exportCSV = () => {
    const headers = ["Date", "Overall Experience", "Staff Helpful", "Product Quality", "Store Experience", "Found Everything", "Email", "Phone", "Sentiment"];
    const rows = responses.map((r) => [
      format(new Date(r.created_at), "yyyy-MM-dd HH:mm"),
      r.overall_experience, r.staff_helpful, r.product_quality, r.store_experience, r.found_everything,
      r.email || "", r.phone || "", isPositiveResponse(r) ? "Positive" : "Negative",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `feedback-${format(new Date(), "yyyy-MM-dd")}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const totalResponses = responses.length;
  const positiveCount = responses.filter(isPositiveResponse).length;
  const negativeCount = totalResponses - positiveCount;
  const withContact = responses.filter((r) => r.email || r.phone).length;

  if (!isAdmin || loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="py-8">
      <div className="container-wide max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blogs")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-display text-2xl md:text-3xl tracking-wider uppercase">
              Feedback
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total</CardTitle></CardHeader>
            <CardContent><div className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{totalResponses}</span></div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Positive</CardTitle></CardHeader>
            <CardContent><div className="flex items-center gap-2"><ThumbsUp className="w-5 h-5 text-green-600" /><span className="text-2xl font-bold">{totalResponses ? Math.round((positiveCount / totalResponses) * 100) : 0}%</span></div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Negative</CardTitle></CardHeader>
            <CardContent><div className="flex items-center gap-2"><ThumbsDown className="w-5 h-5 text-red-500" /><span className="text-2xl font-bold">{totalResponses ? Math.round((negativeCount / totalResponses) * 100) : 0}%</span></div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">With Contact</CardTitle></CardHeader>
            <CardContent><div className="flex items-center gap-2"><Phone className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{withContact}</span></div></CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-4">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Overall</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Found All</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No feedback responses yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  responses.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="whitespace-nowrap text-sm">
                        {format(new Date(r.created_at), "dd MMM yyyy HH:mm")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isPositiveResponse(r) ? "default" : "destructive"}>
                          {isPositiveResponse(r) ? "Positive" : "Negative"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{r.overall_experience}</TableCell>
                      <TableCell className="text-sm">{r.staff_helpful}</TableCell>
                      <TableCell className="text-sm">{r.product_quality}</TableCell>
                      <TableCell className="text-sm">{r.store_experience}</TableCell>
                      <TableCell className="text-sm">{r.found_everything}</TableCell>
                      <TableCell className="text-sm">
                        {r.email && <div>{r.email}</div>}
                        {r.phone && <div>{r.phone}</div>}
                        {!r.email && !r.phone && <span className="text-muted-foreground">—</span>}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackAdmin;
