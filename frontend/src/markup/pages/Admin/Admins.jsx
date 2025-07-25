"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Badge } from "../../components/admin/ui/badge"
import { Button } from "../../components/admin/ui/button"
import { Input } from "../../components/admin/ui/input"
import { Label } from "../../components/admin/ui/label"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/admin/ui/tabs"
import { Plus, Edit, Trash2, Users, Shield, UserCheck, Search, Eye, UserPlus, Settings } from "lucide-react"

// Sample data for all users (customers + admins)
const allUsers = [
  {
    id: 1,
    name: "Farm Admin",
    email: "admin@azfarm.com",
    phone: "+971-50-000-0001",
    role: "super_admin",
    status: "active",
    lastLogin: "2024-01-15 10:30 AM",
    createdDate: "2024-01-01",
    totalOrders: 0,
    permissions: ["all"],
    userType: "admin",
  },
  {
    id: 2,
    name: "Mohammed Hassan",
    email: "mohammed@azfarm.com",
    phone: "+971-50-000-0002",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-14 02:15 PM",
    createdDate: "2024-01-05",
    totalOrders: 0,
    permissions: ["orders", "animals", "pricing"],
    userType: "admin",
  },
  {
    id: 3,
    name: "Sarah Abdullah",
    email: "sarah@azfarm.com",
    phone: "+971-50-000-0003",
    role: "staff",
    status: "active",
    lastLogin: "2024-01-13 09:45 AM",
    createdDate: "2024-01-10",
    totalOrders: 0,
    permissions: ["orders", "gallery"],
    userType: "admin",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+971-50-123-4567",
    role: "customer",
    status: "active",
    lastLogin: "2024-01-15 08:20 AM",
    createdDate: "2024-01-01",
    totalOrders: 5,
    permissions: [],
    userType: "customer",
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    email: "fatima.alzahra@email.com",
    phone: "+971-55-987-6543",
    role: "customer",
    status: "active",
    lastLogin: "2024-01-14 06:30 PM",
    createdDate: "2024-01-02",
    totalOrders: 8,
    permissions: [],
    userType: "customer",
  },
  {
    id: 6,
    name: "Mohammed Ali",
    email: "mohammed.ali@email.com",
    phone: "+971-52-456-7890",
    role: "customer",
    status: "active",
    lastLogin: "2024-01-13 11:15 AM",
    createdDate: "2024-01-03",
    totalOrders: 3,
    permissions: [],
    userType: "customer",
  },
  {
    id: 7,
    name: "Omar Khalil",
    email: "omar.khalil@email.com",
    phone: "+971-56-234-5678",
    role: "customer",
    status: "inactive",
    lastLogin: "2024-01-10 04:20 PM",
    createdDate: "2024-01-08",
    totalOrders: 1,
    permissions: [],
    userType: "customer",
  },
  {
    id: 8,
    name: "Aisha Mohammed",
    email: "aisha.mohammed@email.com",
    phone: "+971-54-345-6789",
    role: "customer",
    status: "active",
    lastLogin: "2024-01-12 03:45 PM",
    createdDate: "2024-01-06",
    totalOrders: 12,
    permissions: [],
    userType: "customer",
  },
]

function Admins() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isAddingAdmin, setIsAddingAdmin] = useState(false)
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [isViewingUser, setIsViewingUser] = useState(false)
  const [isPromotingUser, setIsPromotingUser] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("users")

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    permissions: [],
  })

  // Filter users based on current tab
  const adminUsers = allUsers.filter((user) => user.userType === "admin")
  const customerUsers = allUsers.filter((user) => user.userType === "customer")

  const getCurrentUsers = () => {
    return activeTab === "admins" ? adminUsers : activeTab === "customers" ? customerUsers : allUsers
  }

  const filteredUsers = getCurrentUsers().filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role) => {
    switch (role) {
      case "super_admin":
        return <Badge className="bg-red-100 text-red-800">Super Admin</Badge>
      case "manager":
        return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>
      case "staff":
        return <Badge className="bg-purple-100 text-purple-800">Staff</Badge>
      case "customer":
        return <Badge variant="secondary">Customer</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.role) {
      console.log("Adding new admin:", newAdmin)
      setNewAdmin({
        name: "",
        email: "",
        phone: "",
        role: "",
        permissions: [],
      })
      setIsAddingAdmin(false)
    }
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setNewAdmin({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      permissions: user.permissions,
    })
    setIsEditingUser(true)
  }

  const handleUpdateUser = () => {
    console.log("Updating user:", selectedUser.id, newAdmin)
    setIsEditingUser(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (userId) => {
    console.log("Deleting user:", userId)
  }

  const toggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    console.log(`Changing user ${userId} status to ${newStatus}`)
  }

  const handlePromoteToAdmin = (user) => {
    setSelectedUser(user)
    setNewAdmin({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: "staff",
      permissions: ["orders"],
    })
    setIsPromotingUser(true)
  }

  const handleConfirmPromotion = () => {
    console.log("Promoting user to admin:", selectedUser.id, newAdmin)
    setIsPromotingUser(false)
    setSelectedUser(null)
  }

  const getAvailableRoles = () => {
    if (activeTab === "customers") {
      return [
        { value: "customer", label: "Customer" },
        { value: "staff", label: "Staff" },
        { value: "manager", label: "Manager" },
        { value: "super_admin", label: "Super Admin" },
      ]
    }
    return [
      { value: "staff", label: "Staff" },
      { value: "manager", label: "Manager" },
      { value: "super_admin", label: "Super Admin" },
    ]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Dialog open={isAddingAdmin} onOpenChange={setIsAddingAdmin}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription>Create a new admin user account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input
                    id="admin-name"
                    placeholder="Enter full name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@azfarm.com"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-phone">Phone</Label>
                <Input
                  id="admin-phone"
                  placeholder="+971-50-000-0000"
                  value={newAdmin.phone}
                  onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingAdmin(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAdmin}>Add Admin</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-muted-foreground">All registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers.length}</div>
            <p className="text-xs text-muted-foreground">Admin accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerUsers.length}</div>
            <p className="text-xs text-muted-foreground">Customer accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.filter((user) => user.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different user types */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="admins">Admin Users</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterRole("all")
                    setFilterStatus("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Complete list of all users in the system ({filteredUsers.length} shown)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.totalOrders}</TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user)
                              setIsViewingUser(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.role === "customer" && (
                            <Button variant="outline" size="sm" onClick={() => handlePromoteToAdmin(user)}>
                              <UserPlus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Users</CardTitle>
              <CardDescription>
                Manage customer accounts and promote to admin ({filteredUsers.length} shown)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Member Since</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.totalOrders}</TableCell>
                      <TableCell className="text-sm">{user.createdDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user)
                              setIsViewingUser(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handlePromoteToAdmin(user)}>
                            <UserPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => toggleUserStatus(user.id, user.status)}>
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage admin users and their permissions ({filteredUsers.length} shown)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 2).map((perm) => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                          {user.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.permissions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => toggleUserStatus(user.id, user.status)}>
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          {user.role !== "super_admin" && (
                            <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View User Dialog */}
      <Dialog open={isViewingUser} onOpenChange={setIsViewingUser}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Complete user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Orders</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.totalOrders}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Login</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Member Since</Label>
                  <p className="text-sm text-muted-foreground">{selectedUser.createdDate}</p>
                </div>
              </div>
              {selectedUser.permissions.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Permissions</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedUser.permissions.map((perm) => (
                      <Badge key={perm} variant="outline">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditingUser} onOpenChange={setIsEditingUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and role</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={newAdmin.phone}
                onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableRoles().map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingUser(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Promote to Admin Dialog */}
      <Dialog open={isPromotingUser} onOpenChange={setIsPromotingUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote to Admin</DialogTitle>
            <DialogDescription>Promote {selectedUser?.name} from customer to admin role</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> This will change the user's role from customer to admin. They will gain access
                to the admin dashboard and selected permissions.
              </p>
            </div>
            <div className="space-y-2">
              <Label>New Admin Role</Label>
              <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Initial Permissions</Label>
              <div className="grid grid-cols-2 gap-2">
                {["orders", "animals", "pricing", "gallery", "testimonials"].map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newAdmin.permissions.includes(perm)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewAdmin({
                            ...newAdmin,
                            permissions: [...newAdmin.permissions, perm],
                          })
                        } else {
                          setNewAdmin({
                            ...newAdmin,
                            permissions: newAdmin.permissions.filter((p) => p !== perm),
                          })
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromotingUser(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPromotion}>Promote to Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Admins
