"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Badge } from "../../components/admin/ui/badge"
import { Button } from "../../components/admin/ui/button"
import { Input } from "../../components/admin/ui/input"
import { Label } from "../../components/admin/ui/label"
import { Textarea } from "../../components/admin/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/admin/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/admin/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/admin/ui/select"
import { Plus, Trash2, Check, X, Star, MessageSquare } from "lucide-react"

const testimonials = [
  {
    id: 1,
    customerName: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    rating: 5,
    message:
      "Excellent service! The sheep was of premium quality and the slaughtering service was professional. Highly recommended for anyone looking for quality meat.",
    status: "approved",
    submittedDate: "2024-01-15",
    approvedDate: "2024-01-15",
  },
  {
    id: 2,
    customerName: "Fatima Al-Zahra",
    email: "fatima.alzahra@email.com",
    rating: 5,
    message:
      "A&Z Family Farm has been our go-to for fresh goat meat. The animals are healthy and well-cared for. The cutting service is also very precise.",
    status: "approved",
    submittedDate: "2024-01-14",
    approvedDate: "2024-01-14",
  },
  {
    id: 3,
    customerName: "Mohammed Ali",
    email: "mohammed.ali@email.com",
    rating: 4,
    message:
      "Good quality animals and reasonable prices. The delivery was on time and the meat was fresh. Will definitely order again.",
    status: "pending",
    submittedDate: "2024-01-13",
    approvedDate: null,
  },
  {
    id: 4,
    customerName: "Sarah Abdullah",
    email: "sarah.abdullah@email.com",
    rating: 5,
    message:
      "Outstanding experience from start to finish. The team was professional, the animal quality was excellent, and the service exceeded expectations.",
    status: "approved",
    submittedDate: "2024-01-12",
    approvedDate: "2024-01-12",
  },
  {
    id: 5,
    customerName: "Omar Khalil",
    email: "omar.khalil@email.com",
    rating: 3,
    message: "The service was okay but could be improved. The animal quality was good but delivery was delayed.",
    status: "rejected",
    submittedDate: "2024-01-11",
    approvedDate: null,
  },
]

function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [newTestimonial, setNewTestimonial] = useState({
    customerName: "",
    email: "",
    rating: 5,
    message: "",
  })

  const filteredTestimonials = testimonials.filter((testimonial) => {
    return filterStatus === "all" || testimonial.status === filterStatus
  })

  const updateTestimonialStatus = (id, status) => {
    console.log(`Updating testimonial ${id} to status: ${status}`)
  }

  const deleteTestimonial = (id) => {
    console.log(`Deleting testimonial ${id}`)
  }

  const addTestimonial = () => {
    if (newTestimonial.customerName && newTestimonial.message) {
      console.log("Adding testimonial:", newTestimonial)
      setNewTestimonial({
        customerName: "",
        email: "",
        rating: 5,
        message: "",
      })
      setIsAdding(false)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Testimonials Management</h1>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
              <DialogDescription>Manually add a customer testimonial</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-name">Customer Name</Label>
                  <Input
                    id="customer-name"
                    placeholder="Customer name"
                    value={newTestimonial.customerName}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, customerName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email (Optional)</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    placeholder="customer@email.com"
                    value={newTestimonial.email}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <Select
                  value={newTestimonial.rating.toString()}
                  onValueChange={(value) => setNewTestimonial({ ...newTestimonial, rating: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Stars - Excellent</SelectItem>
                    <SelectItem value="4">4 Stars - Very Good</SelectItem>
                    <SelectItem value="3">3 Stars - Good</SelectItem>
                    <SelectItem value="2">2 Stars - Fair</SelectItem>
                    <SelectItem value="1">1 Star - Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial-message">Testimonial Message</Label>
                <Textarea
                  id="testimonial-message"
                  placeholder="Enter the customer's testimonial..."
                  rows={4}
                  value={newTestimonial.message}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={addTestimonial}>Add Testimonial</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.length}</div>
            <p className="text-xs text-muted-foreground">All testimonials</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.filter((t) => t.status === "approved").length}</div>
            <p className="text-xs text-muted-foreground">Published testimonials</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.filter((t) => t.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => setFilterStatus("all")}>
                Clear Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Testimonials</CardTitle>
          <CardDescription>
            Manage customer feedback and testimonials ({filteredTestimonials.length} shown)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{testimonial.customerName}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{renderStars(testimonial.rating)}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm truncate">{testimonial.message}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                  <TableCell className="text-sm">{testimonial.submittedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedTestimonial(testimonial)}>
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Testimonial Details</DialogTitle>
                            <DialogDescription>Review and manage customer testimonial</DialogDescription>
                          </DialogHeader>
                          {selectedTestimonial && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Customer Name</Label>
                                  <p className="text-sm text-muted-foreground">{selectedTestimonial.customerName}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Email</Label>
                                  <p className="text-sm text-muted-foreground">{selectedTestimonial.email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Rating</Label>
                                  <div className="mt-1">{renderStars(selectedTestimonial.rating)}</div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <div className="mt-1">{getStatusBadge(selectedTestimonial.status)}</div>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Testimonial Message</Label>
                                <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted rounded-lg">
                                  {selectedTestimonial.message}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Submitted Date</Label>
                                  <p className="text-sm text-muted-foreground">{selectedTestimonial.submittedDate}</p>
                                </div>
                                {selectedTestimonial.approvedDate && (
                                  <div>
                                    <Label className="text-sm font-medium">Approved Date</Label>
                                    <p className="text-sm text-muted-foreground">{selectedTestimonial.approvedDate}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <DialogFooter className="flex justify-between">
                            <Button
                              variant="destructive"
                              onClick={() => deleteTestimonial(selectedTestimonial?.id || 0)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                            <div className="flex space-x-2">
                              {selectedTestimonial?.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    onClick={() => updateTestimonialStatus(selectedTestimonial?.id || 0, "rejected")}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button
                                    onClick={() => updateTestimonialStatus(selectedTestimonial?.id || 0, "approved")}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                </>
                              )}
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      {testimonial.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateTestimonialStatus(testimonial.id, "rejected")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => updateTestimonialStatus(testimonial.id, "approved")}>
                            <Check className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Testimonials
