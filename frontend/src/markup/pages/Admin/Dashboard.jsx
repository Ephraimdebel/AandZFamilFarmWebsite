import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Badge } from "../../components/admin/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ShoppingCart, Package, DollarSign, Users, Clock, CheckCircle, AlertCircle } from "lucide-react"

const ordersByMonth = [
  { month: "Jan", orders: 12, revenue: 15600 },
  { month: "Feb", orders: 19, revenue: 24700 },
  { month: "Mar", orders: 15, revenue: 19500 },
  { month: "Apr", orders: 22, revenue: 28600 },
  { month: "May", orders: 28, revenue: 36400 },
  { month: "Jun", orders: 25, revenue: 32500 },
]

const animalDistribution = [
  { name: "Sheep", value: 65, color: "#22c55e" },
  { name: "Goat", value: 35, color: "#3b82f6" },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Ahmed Hassan",
    animal: "Sheep",
    weight: "25-30kg",
    service: "Purchase + Slaughter",
    status: "pending",
    amount: 1200,
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Fatima Al-Zahra",
    animal: "Goat",
    weight: "20-25kg",
    service: "Purchase Only",
    status: "completed",
    amount: 800,
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Mohammed Ali",
    animal: "Sheep",
    weight: "30-35kg",
    service: "Purchase + Slaughter + Cutting",
    status: "in-progress",
    amount: 1500,
    date: "2024-01-13",
  },
]

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Badge variant="outline">Last updated: 2 minutes ago</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">121</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$157,300</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Animals Sold</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Orders Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Monthly Orders & Revenue</CardTitle>
            <CardDescription>Orders and revenue trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="orders" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Animal Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Animal Distribution</CardTitle>
            <CardDescription>Breakdown of orders by animal type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={animalDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {animalDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {animalDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest customer orders requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.animal} • {order.weight} • {order.service}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${order.amount}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" : order.status === "pending" ? "secondary" : "outline"
                    }
                    className="flex items-center space-x-1"
                  >
                    {order.status === "completed" && <CheckCircle className="h-3 w-3" />}
                    {order.status === "pending" && <Clock className="h-3 w-3" />}
                    {order.status === "in-progress" && <AlertCircle className="h-3 w-3" />}
                    <span className="capitalize">{order.status.replace("-", " ")}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
