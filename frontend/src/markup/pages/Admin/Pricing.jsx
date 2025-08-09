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
import { Plus, Edit, DollarSign, TrendingUp } from "lucide-react"

const pricingData = [
  {
    id: 1,
    animal: "Sheep",
    weightRange: "15-20kg",
    basePrice: 800,
    slaughterPrice: 50,
    cuttingPrice: 30,
    totalWithServices: 880,
    lastUpdated: "2024-01-10",
  },
  {
    id: 2,
    animal: "Sheep",
    weightRange: "20-25kg",
    basePrice: 1000,
    slaughterPrice: 60,
    cuttingPrice: 35,
    totalWithServices: 1095,
    lastUpdated: "2024-01-10",
  },
  {
    id: 3,
    animal: "Sheep",
    weightRange: "25-30kg",
    basePrice: 1200,
    slaughterPrice: 70,
    cuttingPrice: 40,
    totalWithServices: 1310,
    lastUpdated: "2024-01-10",
  },
  {
    id: 4,
    animal: "Goat",
    weightRange: "10-15kg",
    basePrice: 600,
    slaughterPrice: 40,
    cuttingPrice: 25,
    totalWithServices: 665,
    lastUpdated: "2024-01-10",
  },
  {
    id: 5,
    animal: "Goat",
    weightRange: "15-20kg",
    basePrice: 750,
    slaughterPrice: 45,
    cuttingPrice: 30,
    totalWithServices: 825,
    lastUpdated: "2024-01-10",
  },
  {
    id: 6,
    animal: "Goat",
    weightRange: "20-25kg",
    basePrice: 900,
    slaughterPrice: 50,
    cuttingPrice: 35,
    totalWithServices: 985,
    lastUpdated: "2024-01-10",
  },
]

function Pricing() {
  const [selectedPricing, setSelectedPricing] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editForm, setEditForm] = useState({
    animal: "",
    weightRange: "",
    basePrice: "",
    slaughterPrice: "",
    cuttingPrice: "",
  })

  const handleEdit = (pricing) => {
    setSelectedPricing(pricing)
    setEditForm({
      animal: pricing.animal,
      weightRange: pricing.weightRange,
      basePrice: pricing.basePrice.toString(),
      slaughterPrice: pricing.slaughterPrice.toString(),
      cuttingPrice: pricing.cuttingPrice.toString(),
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    setSelectedPricing(null)
  }

  const handleAdd = () => {
    setIsAdding(false)
    setEditForm({
      animal: "",
      weightRange: "",
      basePrice: "",
      slaughterPrice: "",
      cuttingPrice: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pricing Management</h1>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Pricing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Pricing</DialogTitle>
              <DialogDescription>Set prices for a new animal category and weight range</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Animal Type</Label>
                  <Select
                    value={editForm.animal}
                    onValueChange={(value) => setEditForm({ ...editForm, animal: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select animal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sheep">Sheep</SelectItem>
                      <SelectItem value="Goat">Goat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight-range">Weight Range</Label>
                  <Input
                    id="weight-range"
                    placeholder="e.g., 30-35kg"
                    value={editForm.weightRange}
                    onChange={(e) => setEditForm({ ...editForm, weightRange: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base-price">Base Price ($)</Label>
                  <Input
                    id="base-price"
                    type="number"
                    placeholder="1400"
                    value={editForm.basePrice}
                    onChange={(e) => setEditForm({ ...editForm, basePrice: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slaughter-price">Slaughter Price ($)</Label>
                  <Input
                    id="slaughter-price"
                    type="number"
                    placeholder="70"
                    value={editForm.slaughterPrice}
                    onChange={(e) => setEditForm({ ...editForm, slaughterPrice: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cutting-price">Cutting Price ($)</Label>
                  <Input
                    id="cutting-price"
                    type="number"
                    placeholder="40"
                    value={editForm.cuttingPrice}
                    onChange={(e) => setEditForm({ ...editForm, cuttingPrice: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd}>Add Pricing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Base Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(pricingData.reduce((sum, item) => sum + item.basePrice, 0) / pricingData.length)}
            </div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.max(...pricingData.map((item) => item.totalWithServices))}</div>
            <p className="text-xs text-muted-foreground">With all services</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${pricingData.reduce((sum, item) => sum + item.slaughterPrice + item.cuttingPrice, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Additional services total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Categories</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pricingData.length}</div>
            <p className="text-xs text-muted-foreground">Active pricing tiers</p>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Pricing Structure</CardTitle>
          <CardDescription>Manage prices for different animal types, weights, and services</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Animal</TableHead>
                <TableHead>Weight Range</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Slaughter (+)</TableHead>
                <TableHead>Cutting (+)</TableHead>
                <TableHead>Total with Services</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingData.map((pricing) => (
                <TableRow key={pricing.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{pricing.animal}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{pricing.weightRange}</TableCell>
                  <TableCell>${pricing.basePrice}</TableCell>
                  <TableCell className="text-green-600">+${pricing.slaughterPrice}</TableCell>
                  <TableCell className="text-green-600">+${pricing.cuttingPrice}</TableCell>
                  <TableCell className="font-bold">${pricing.totalWithServices}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{pricing.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(pricing)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Pricing</DialogTitle>
            <DialogDescription>
              Update pricing for {selectedPricing?.animal} ({selectedPricing?.weightRange})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-base-price">Base Price ($)</Label>
                <Input
                  id="edit-base-price"
                  type="number"
                  value={editForm.basePrice}
                  onChange={(e) => setEditForm({ ...editForm, basePrice: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slaughter-price">Slaughter Price ($)</Label>
                <Input
                  id="edit-slaughter-price"
                  type="number"
                  value={editForm.slaughterPrice}
                  onChange={(e) => setEditForm({ ...editForm, slaughterPrice: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cutting-price">Cutting Price ($)</Label>
                <Input
                  id="edit-cutting-price"
                  type="number"
                  value={editForm.cuttingPrice}
                  onChange={(e) => setEditForm({ ...editForm, cuttingPrice: e.target.value })}
                />
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total with all services:</span>
                <span className="text-lg font-bold">
                  $
                  {(Number.parseInt(editForm.basePrice) || 0) +
                    (Number.parseInt(editForm.slaughterPrice) || 0) +
                    (Number.parseInt(editForm.cuttingPrice) || 0)}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Pricing
