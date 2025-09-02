"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Badge } from "../../components/admin/ui/badge"
import { Button } from "../../components/admin/ui/button"
import { Input } from "../../components/admin/ui/input"
import { Label } from "../../components/admin/ui/label"
import { toast } from "sonner";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/admin/ui/select"
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
// import { Search, Filter, Eye, Check, X, Phone, Mail, Calendar, Package, DollarSign } from "lucide-react"

import {
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Eye,
  Edit,
  Trash2,
  XCircle,
  DollarSign,
  Loader2,
  RefreshCw,
} from "lucide-react"


import { Alert, AlertDescription } from "../../components/admin/ui/alert"
import { protectedAxios } from "../../../../utils/axios"
import { AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction} from "../../components/admin/ui/alert-dialog"
import { AlertDialog } from "../../components/admin/ui/alert-dialog"

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [animalFilter, setAnimalFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderTodelete, setOrderTodelete] = useState(null)
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  // Fetch orders from backend
  const fetchOrders = async (page = 1) => {
  try {
    setLoading(true);
    setError("");
    const response = await protectedAxios.get(`/orders?page=${page}&limit=10`);
    setOrders(response.data.orders);
    setPagination(response.data.pagination);
  } catch (error) {
    console.error("Error fetching orders:", error);
    setError("Failed to load orders. Please check if the server is running.");
    setOrders([]);
  } finally {
    setLoading(false);
  }
};

  // Load orders on component mount
  useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrderStatus = async (orderId, newStatus) => {
    try {

      await protectedAxios.put(`/order/${orderId}/status`,{ status: newStatus })
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)),
      )
    } catch (error) {
      console.error("Error updating order status:", error)
      alert("Failed to update order status. Please try again.")
    }
  }

  const updatePaymentStatus = async (orderId, newPaymentStatus) => {
    try {

      await protectedAxios.put(`/order/${orderId}/payment`,{ paymentStatus: newPaymentStatus })

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, payment_status: newPaymentStatus } : order)),
      )
    } catch (error) {
      console.error("Error updating payment status:", error)
      alert("Failed to update payment status. Please try again.")
    }
  }

  const handleDeleteOrder = async ()=>{
    try{
      await protectedAxios.delete(`/order/${orderTodelete?.id}`)
  

      const response = await protectedAxios.get('/orders')
      toast.success("order deleted succesuly")
      
      setOrders(response?.data?.orders)
    }catch{
      toast.error("unable to delete order")
    }finally{
      setOrderTodelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // order.id?.includes(searchTerm.toLowerCase()) ||
      order.phone?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesAnimal = animalFilter === "all" || order.animal?.toLowerCase() === animalFilter.toLowerCase()
    const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter

    return matchesSearch && matchesStatus && matchesAnimal && matchesPayment
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "accepted":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentBadge = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <DollarSign className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        )
      case "unpaid":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Unpaid
          </Badge>
        )
      default:
        return <Badge variant="outline">{paymentStatus}</Badge>
    }
  }

  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => order.status === "pending").length
  const completedOrders = orders.filter((order) => order.status === "completed").length
    const acceptedOrders = orders.filter((order) => order.status === "accepted").length


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#07ADB1] mx-auto mb-4" />
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <Button onClick={fetchOrders} className="bg-[#07ADB1] hover:bg-[#069ca0]">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <div className="flex gap-2">
          <Button onClick={fetchOrders} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-[#07ADB1] hover:bg-[#069ca0]">
            <ShoppingCart className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{acceptedOrders}</div>
            <p className="text-xs text-muted-foreground">Ready for processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully fulfilled</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From paid orders</p>
          </CardContent>
        </Card> */}

        
      </div>
      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by customer, ID, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 focus:ring-[#07ADB1] focus:border-[#07ADB1]"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={animalFilter} onValueChange={setAnimalFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Animal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Animals</SelectItem>
                  <SelectItem value="sheep">Sheep</SelectItem>
                  <SelectItem value="goat">Goat</SelectItem>
                  <SelectItem value="lamb">Lamb</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Showing {filteredOrders.length} of {totalOrders} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
              {totalOrders === 0 && (
                <p className="text-sm text-gray-400 mt-2">Orders will appear here once customers make reservations</p>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Animal Details</TableHead>
                  <TableHead>Selected Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Reservation Fee</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order?.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer || "N/A"}</div>
                        <div className="text-sm text-muted-foreground">{order.phone || "N/A"}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {order.animal || "N/A"} x{order.quantity || 1}
                        </div>
                        <div className="text-sm text-muted-foreground">{order.size || "N/A"}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {order.selected_date ? new Date(order.selected_date).toLocaleDateString() : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue>{getStatusBadge(order.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-2 text-yellow-600" />
                              Pending
                            </div>
                          </SelectItem>
                          <SelectItem value="accepted">
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-blue-600" />
                              Accepted
                            </div>
                          </SelectItem>
                          <SelectItem value="completed">
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                              Completed
                            </div>
                          </SelectItem>
                          <SelectItem value="rejected">
                            <div className="flex items-center">
                              <XCircle className="h-3 w-3 mr-2 text-red-600" />
                              Rejected
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.payment_status}
                        onValueChange={(value) => updatePaymentStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-[110px] h-8">
                          <SelectValue>{getPaymentBadge(order.payment_status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unpaid">
                            <div className="flex items-center">
                              <AlertCircle className="h-3 w-3 mr-2 text-red-600" />
                              Unpaid
                            </div>
                          </SelectItem>
                          <SelectItem value="paid">
                            <div className="flex items-center">
                              <DollarSign className="h-3 w-3 mr-2 text-green-600" />
                              Paid
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="font-medium">${order.reservation_fee || 0}</TableCell>
                    <TableCell>{order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {/* <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button> */}
                        <Button variant="ghost" size="sm" onClick={() => {
                          setOrderTodelete(order)
                          setIsDeleteDialogOpen(true)
                        }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
          )}
          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
            variant="outline"
              disabled={pagination.currentPage === 1}
              onClick={() => fetchOrders(pagination.currentPage - 1)}
              size="sm"
            >
              Previous
            </Button>

            <span className="px-4 py-2">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <Button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => fetchOrders(pagination.currentPage + 1)}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category "{orderTodelete?.title}" and may affect associated
              courses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOrderTodelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOrder}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Orders





