import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Leave() {
  const [leaveData, setLeaveData] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
    emergencyContact: ""
  });

  const handleSubmit = () => {
    if (!leaveData.type || !leaveData.fromDate || !leaveData.toDate || !leaveData.reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Leave application submitted successfully",
    });

    // Reset form
    setLeaveData({
      type: "",
      fromDate: "",
      toDate: "",
      reason: "",
      emergencyContact: ""
    });
  };

  const leaveHistory = [
    {
      id: "L001",
      type: "Medical Leave",
      dates: "Dec 15-20, 2024",
      status: "approved",
      reason: "Medical appointment",
      appliedOn: "Dec 10, 2024"
    },
    {
      id: "L002", 
      type: "Home Visit",
      dates: "Dec 22-25, 2024",
      status: "pending",
      reason: "Family emergency",
      appliedOn: "Dec 18, 2024"
    },
    {
      id: "L003",
      type: "Personal Leave",
      dates: "Nov 10-12, 2024", 
      status: "rejected",
      reason: "Personal work",
      appliedOn: "Nov 5, 2024"
    }
  ];

  return (
    <Layout title="Leave Application" userType="student">
      <div className="space-y-8">
        {/* Leave Application Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Apply for Leave
            </CardTitle>
            <CardDescription>
              Submit your leave application for warden approval
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="leave-type">Leave Type *</Label>
                <Select value={leaveData.type} onValueChange={(value) => 
                  setLeaveData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical Leave</SelectItem>
                    <SelectItem value="emergency">Emergency Leave</SelectItem>
                    <SelectItem value="home">Home Visit</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="academic">Academic Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency Contact</Label>
                <Input
                  id="emergency-contact"
                  placeholder="Parent/Guardian phone number"
                  value={leaveData.emergencyContact}
                  onChange={(e) => setLeaveData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-date">From Date *</Label>
                <Input
                  id="from-date"
                  type="date"
                  value={leaveData.fromDate}
                  onChange={(e) => setLeaveData(prev => ({ ...prev, fromDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-date">To Date *</Label>
                <Input
                  id="to-date"
                  type="date"
                  value={leaveData.toDate}
                  onChange={(e) => setLeaveData(prev => ({ ...prev, toDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave *</Label>
              <Textarea
                id="reason"
                placeholder="Please provide detailed reason for your leave application..."
                rows={4}
                value={leaveData.reason}
                onChange={(e) => setLeaveData(prev => ({ ...prev, reason: e.target.value }))}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full md:w-auto">
              Submit Leave Application
            </Button>
          </CardContent>
        </Card>

        {/* Leave History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Leave History
            </CardTitle>
            <CardDescription>
              Track your previous leave applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveHistory.map((leave) => (
                <div key={leave.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold">{leave.type}</div>
                      <div className="flex items-center gap-1">
                        {leave.status === "approved" && <CheckCircle className="h-4 w-4 text-success" />}
                        {leave.status === "pending" && <Clock className="h-4 w-4 text-warning" />}
                        {leave.status === "rejected" && <XCircle className="h-4 w-4 text-destructive" />}
                        <span className={`text-sm capitalize font-medium
                          ${leave.status === "approved" ? "text-success" : ""}
                          ${leave.status === "pending" ? "text-warning" : ""}
                          ${leave.status === "rejected" ? "text-destructive" : ""}
                        `}>
                          {leave.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">ID: {leave.id}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Dates: </span>
                      {leave.dates}
                    </div>
                    <div>
                      <span className="font-medium">Applied: </span>
                      {leave.appliedOn}
                    </div>
                    <div>
                      <span className="font-medium">Reason: </span>
                      {leave.reason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}