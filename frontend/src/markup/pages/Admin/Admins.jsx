"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/admin/ui/card";
import { Badge } from "../../components/admin/ui/badge";
import { Button } from "../../components/admin/ui/button";
import { Input } from "../../components/admin/ui/input";
import { Label } from "../../components/admin/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/admin/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/admin/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/admin/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/admin/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Shield,
  UserCheck,
  Search,
  Eye,
  UserPlus,
  Settings,
} from "lucide-react";
import { useEffect } from "react";
import { deleteUser, getAllUsers, updateUserRole } from "../../../api/usersApi";
import { formatDate } from "../../../../utils/formatDate";
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel } from "../../components/admin/ui/alert-dialog";

// Sample data for all users (customers + admins)


function Admins() {
  const [users, setUser] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  // const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isViewingUser, setIsViewingUser] = useState(false);
  const [isPromotingUser, setIsPromotingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [activeTab, setActiveTab] = useState("users");
  const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    permissions: [],
  });

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        
        setUser(response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllUsers();
  }, []);
  // Filter users based on current tab
  const adminUsers = users?.filter((user) => user?.role === "admin");
  const customerUsers = users?.filter((user) => user?.role === "user");

  const getCurrentUsers = () => {
    return activeTab === "admin"
      ? adminUsers
      : activeTab === "customers"
      ? customerUsers
      : users;
  };

  const filteredUsers = getCurrentUsers().filter((user) => {
    const matchesSearch =
      user?.fullname?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;


    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case "manager":
        return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>;
      case "staff":
        return <Badge className="bg-purple-100 text-purple-800">Staff</Badge>;
      case "user":
        return <Badge variant="secondary">Customer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };


  // const handleAddAdmin = () => {
  //   if (newAdmin.name && newAdmin.email && newAdmin.role) {
  //     console.log("Adding new admin:", newAdmin);
  //     setNewAdmin({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       role: "",
  //       permissions: [],
  //     });
  //     setIsAddingAdmin(false);
  //   }
  // };

  const handleUpdateUser = () => {
    setIsEditingUser(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    try{
      const deleteResponse = await deleteUser(selectedUser?.id)
      const getResponse = await getAllUsers();
        setUser(getResponse)
      toast.success(deleteResponse?.data?.message || "deleted succefully")
    }catch(error){
      console.error("error ",error)
    }
  };



  const handlePromoteToAdmin = (user) => {
    setSelectedUser(user);
    setNewAdmin({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: "staff",
      permissions: ["orders"],
    });
    setIsPromotingUser(true);
  };

  const handleConfirmPromotion = async() => {
    try{
      const response = await updateUserRole(selectedUser?.id,"admin")
       const getResponse = await getAllUsers();
        setUser(getResponse)
      toast.success(response?.data?.message || "updated succefully")
    }catch(error){
      console.error(error)
    }finally{

      setIsPromotingUser(false);
      setSelectedUser(null);
    }
  };

  const getAvailableRoles = () => {
    if (activeTab === "user") {
      return [
        { value: "customer", label: "Customer" },
        { value: "staff", label: "Staff" },
        { value: "manager", label: "Manager" },
        { value: "super_admin", label: "Super Admin" },
      ];
    }
    return [
      { value: "staff", label: "Staff" },
      { value: "manager", label: "Manager" },
      { value: "super_admin", label: "Super Admin" },
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        {/* <Dialog open={isAddingAdmin} onOpenChange={setIsAddingAdmin}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription>
                Create a new admin user account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input
                    id="admin-name"
                    placeholder="Enter full name"
                    value={newAdmin.name}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@azfarm.com"
                    value={newAdmin.email}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-phone">Phone</Label>
                <Input
                  id="admin-phone"
                  placeholder="+971-50-000-0000"
                  value={newAdmin.phone}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={newAdmin.role}
                  onValueChange={(value) =>
                    setNewAdmin({ ...newAdmin, role: value })
                  }
                >
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
        </Dialog> */}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length}</div>
            <p className="text-xs text-muted-foreground">
              All registered users
            </p>
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

      </div>

      {/* Tabs for different user types */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="admin">Admin Users</TabsTrigger>
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
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterRole("all");
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
              <CardDescription>
                Complete list of all users in the system ({filteredUsers.length}{" "}
                shown)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user?.fullname}</TableCell>
                      <TableCell>{user?.email || 'NA'}</TableCell>
                      <TableCell>{user?.phone || 'NA'}</TableCell>
                      <TableCell>{getRoleBadge(user?.role)}</TableCell>
                      <TableCell className="text-sm">
                        {user?.last_login ? formatDate(user?.last_login) : "Not logged in yet "}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsViewingUser(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          {user?.role === "user" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePromoteToAdmin(user)}
                            >
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
                Manage customer accounts and promote to admin (
                {filteredUsers.length} shown)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>last login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user?.fullname}</TableCell>
                      <TableCell>{user?.email ? user?.email : 'NA'}</TableCell>
                      <TableCell>{user?.phone ? user?.phone : 'NA'}</TableCell>
          
                      <TableCell className="text-sm">
                        {formatDate(user?.last_login)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsViewingUser(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePromoteToAdmin(user)}
                          >
                            <UserPlus className="h-4 w-4" />
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

        <TabsContent value="admin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>
                Manage admin users and their permissions ({filteredUsers.length}{" "}
                shown)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullname}</TableCell>
                      <TableCell>{user?.email ? user.email : 'NA'}</TableCell>
                      <TableCell>{user?.phone ? user?.phone : 'NA'}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="text-sm">
                        { formatDate(user?.last_login)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center space-x-2">
                     
                    
                          {user.role === "admin" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                            >
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
                  <p className="text-sm text-muted-foreground">
                    {selectedUser?.fullname}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser?.email}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser?.phone}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Role</Label>
                  <div className="mt-1">{getRoleBadge(selectedUser?.role)}</div>
                </div>
          
             
                <div>
                  <Label className="text-sm font-medium">Last Login</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedUser?.last_login)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Member Since</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedUser?.created_at)}
                  </p>
                </div>
              </div>
              {/* {selectedUser.permissions.length > 0 && (
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
              )} */}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditingUser} onOpenChange={setIsEditingUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and role
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={newAdmin.fullname}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={newAdmin.phone}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={newAdmin.role}
                onValueChange={(value) =>
                  setNewAdmin({ ...newAdmin, role: value })
                }
              >
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
            <DialogDescription>
              Promote {selectedUser?.fullname} from customer to admin role
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> This will change the user's role from
                customer to admin. They will gain access to the admin dashboard
               
              </p>
            </div>
            <div className="space-y-2">
              <Label>New Admin Role</Label>
              <Select
                value={newAdmin?.role}
                onValueChange={(value) =>
                  setNewAdmin({ ...newAdmin, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
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
      <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    user "{selectedUser?.fullname}" and may affect associated
                    courses.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setSelectedUser(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteUser}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
    </div>
  );
}

export default Admins;
