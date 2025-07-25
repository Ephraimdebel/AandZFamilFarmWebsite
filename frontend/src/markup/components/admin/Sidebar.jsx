"use client"
import { NavLink } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { Button } from "./ui/button"
import { BarChart3, Home, ImageIcon, LogOut, Package, Settings, ShoppingCart, Star, Users, X } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  // {
  //   title: "Animals",
  //   url: "/animals",
  //   icon: Package,
  // },
  // {
  //   title: "Pricing",
  //   url: "/pricing",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Gallery",
  //   url: "/gallery",
  //   icon: ImageIcon,
  // },
  // {
  //   title: "Testimonials",
  //   url: "/testimonials",
  //   icon: Star,
  // },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

function Sidebar({ onClose }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">A&Z Family Farm</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden p-1">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>                           
      </div>
    </div>
  )
}

export default Sidebar
