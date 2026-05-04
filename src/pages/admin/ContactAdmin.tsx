import { useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, Mail, MailOpen, Inbox, Calendar, Search, Archive, X } from "lucide-react";
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
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
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
      setSelectedIds(new Set());
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return messages;
    return messages.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.message || "").toLowerCase().includes(q)
    );
  }, [messages, search]);

  const toggleRead = async (msg: ContactMessage, read: boolean) => {
    const { error } = await supabase.from("contact_messages").update({ read }).eq("id", msg.id);
    if (error) {
      toast({ title: "Error updating", description: error.message, variant: "destructive" });
      return;
    }
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read } : m));
    if (selected?.id === msg.id) setSelected({ ...selected, read });
  };

  const bulkSetRead = async (read: boolean) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    const { error } = await supabase.from("contact_messages").update({ read }).in("id", ids);
    if (error) {
      toast({ title: "Bulk update failed", description: error.message, variant: "destructive" });
      return;
    }
    setMessages((prev) => prev.map((m) => ids.includes(m.id) ? { ...m, read } : m));
    setSelectedIds(new Set());
    toast({ title: `Marked ${ids.length} as ${read ? "read" : "unread"}` });
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((m) => m.id)));
    }
  };

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read) toggleRead(msg, true);
  };

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Message", "Status"];
    const rows = filtered.map((m) => [
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

  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length;

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

        {/* Archive notice */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <Archive className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-charcoal">Archive — public contact form removed</p>
            <p className="text-muted-foreground mt-1">
              The contact form on the website has been retired. Customers are now directed to WhatsApp.
              This view shows historical messages only — no new entries will arrive.
            </p>
          </div>
        </div>

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
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, or message…"
              className="pl-9"
            />
          </div>
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

        {/* Bulk actions */}
        {selectedIds.size > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-3">
            <span className="text-sm font-medium">{selectedIds.size} selected</span>
            <div className="flex-1" />
            <Button size="sm" variant="outline" onClick={() => bulkSetRead(true)}>
              <MailOpen className="w-4 h-4 mr-2" /> Mark as read
            </Button>
            <Button size="sm" variant="outline" onClick={() => bulkSetRead(false)}>
              <Mail className="w-4 h-4 mr-2" /> Mark as unread
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedIds(new Set())}>
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
        )}

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      {messages.length === 0 ? "No contact messages yet." : "No messages match your filters."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((m) => (
                    <TableRow
                      key={m.id}
                      className={`cursor-pointer ${!m.read ? "font-semibold bg-muted/30" : ""}`}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedIds.has(m.id)}
                          onCheckedChange={() => toggleSelect(m.id)}
                          aria-label={`Select message from ${m.name}`}
                        />
                      </TableCell>
                      <TableCell onClick={() => openMessage(m)}>
                        {m.read ? (
                          <Badge variant="secondary"><MailOpen className="w-3 h-3 mr-1" />Read</Badge>
                        ) : (
                          <Badge variant="destructive"><Mail className="w-3 h-3 mr-1" />New</Badge>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm" onClick={() => openMessage(m)}>
                        {format(new Date(m.created_at), "dd MMM yyyy HH:mm")}
                      </TableCell>
                      <TableCell onClick={() => openMessage(m)}>{m.name}</TableCell>
                      <TableCell className="text-sm" onClick={() => openMessage(m)}>{m.email}</TableCell>
                      <TableCell className="max-w-xs truncate text-sm text-muted-foreground" onClick={() => openMessage(m)}>
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
