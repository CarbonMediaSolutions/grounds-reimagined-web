import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminNav from "@/components/admin/AdminNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, Mail, MailOpen, Inbox, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string | null;
  read: boolean;
}

const ContactAdmin = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { checkAdminAndLoad(); }, []);
  useEffect(() => { if (isAdmin) loadMessages(); }, [dateFilter, unreadOnly, isAdmin]);

  const checkAdminAndLoad = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin/login"); return; }
    const { data: roles } = await supabase
      .from("user_roles").select("role")
      .eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) { navigate("/admin/login"); return; }
    setIsAdmin(true);
  };

  const loadMessages = async () => {
    setLoading(true);
    let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false });

    if (dateFilter === "7") {
      const d = new Date(); d.setDate(d.getDate() - 7);
      query = query.gte("created_at", d.toISOString());
    } else if (dateFilter === "30") {
      const d = new Date(); d.setDate(d.getDate() - 30);
      query = query.gte("created_at", d.toISOString());
    }
    if (unreadOnly) query = query.eq("read", false);

    const { data, error } = await query;
    if (error) {
      toast({ title: "Error loading messages", description: error.message, variant: "destructive" });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const toggleRead = async (msg: ContactMessage, read: boolean) => {
    const { error } = await supabase.from("contact_messages").update({ read }).eq("id", msg.id);
    if (error) {
      toast({ title: "Error updating", description: error.message, variant: "destructive" });
      return;
    }
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read } : m));
    if (selected?.id === msg.id) setSelected({ ...selected, read });
  };

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read) toggleRead(msg, true);
  };

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Message", "Status"];
    const rows = messages.map((m) => [
      format(new Date(m.created_at), "yyyy-MM-dd HH:mm"),
      m.name, m.email, (m.message || "").replace(/"/g, '""'),
      m.read ? "Read" : "Unread",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `contact-messages-${format(new Date(), "yyyy-MM-dd")}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const total = messages.length;
  const unreadCount = messages.filter((m) => !m.read).length;
  const last7 = messages.filter((m) => {
    const d = new Date(); d.setDate(d.getDate() - 7);
    return new Date(m.created_at) >= d;
  }).length;

  if (!isAdmin || loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="py-8">
      <div className="container-wide max-w-6xl mx-auto px-4">
        <AdminNav
          title="Contact Messages"
          actions={
            <Button variant="outline" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total</CardTitle></CardHeader>
            <CardContent><div className="flex items-center gap-2"><Inbox className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{total}</span></div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Unread</CardTitle></CardHeader>
            <CardContent><div className="flex items-center gap-2"><Mail className="w-5 h-5 text-destructive" /><span className="text-2xl font-bold">{unreadCount}</span></div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Last 7 days</CardTitle></CardHeader>
            <CardContent><div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /><span className="text-2xl font-bold">{last7}</span></div></CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
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
          <div className="flex items-center gap-2">
            <Switch id="unread" checked={unreadOnly} onCheckedChange={setUnreadOnly} />
            <Label htmlFor="unread">Unread only</Label>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No contact messages yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  messages.map((m) => (
                    <TableRow
                      key={m.id}
                      className={`cursor-pointer ${!m.read ? "font-semibold bg-muted/30" : ""}`}
                      onClick={() => openMessage(m)}
                    >
                      <TableCell>
                        {m.read ? (
                          <Badge variant="secondary"><MailOpen className="w-3 h-3 mr-1" />Read</Badge>
                        ) : (
                          <Badge variant="destructive"><Mail className="w-3 h-3 mr-1" />New</Badge>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">
                        {format(new Date(m.created_at), "dd MMM yyyy HH:mm")}
                      </TableCell>
                      <TableCell>{m.name}</TableCell>
                      <TableCell className="text-sm">{m.email}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                        {m.message || "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display tracking-wider uppercase">
                  Message from {selected.name}
                </DialogTitle>
                <DialogDescription>
                  {format(new Date(selected.created_at), "dd MMM yyyy 'at' HH:mm")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{selected.name}</span>
                  <span className="text-muted-foreground">Email:</span>
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline">{selected.email}</a>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Message:</div>
                  <div className="bg-muted/30 rounded-md p-4 whitespace-pre-wrap text-sm">
                    {selected.message || "(no message)"}
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => toggleRead(selected, !selected.read)}
                >
                  Mark as {selected.read ? "unread" : "read"}
                </Button>
                <Button asChild>
                  <a href={`mailto:${selected.email}?subject=Re: Your message to The Grounds`}>
                    <Mail className="w-4 h-4 mr-2" /> Reply
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactAdmin;
