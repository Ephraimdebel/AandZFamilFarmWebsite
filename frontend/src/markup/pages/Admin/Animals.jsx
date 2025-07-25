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
import { Plus, Edit, Trash2, Package } from "lucide-react"

const animalCategories = [
  {
    id: 1,
    type: "Sheep",
    weightRanges: [
      { id: 1, range: "15-20kg", basePrice: 800, available: 12 },
      { id: 2, range: "20-25kg", basePrice: 1000, available: 8 },
      { id: 3, range: "25-30kg", basePrice: 1200, available: 15 },
      { id: 4, range: "30-35kg", basePrice: 1400, available: 6 },
      { id: 5, range: "35-40kg", basePrice: 1600, available: 3 },
    ],
  },
  {
    id: 2,
    type: "Goat",
    weightRanges: [
      { id: 6, range: "10-15kg", basePrice: 600, available: 10 },
      { id: 7, range: "15-20kg", basePrice: 750, available: 14 },
      { id: 8, range: "20-25kg", basePrice: 900, available: 9 },
      { id: 9, range: "25-30kg", basePrice: 1100, available: 5 },
    ],
  },
]

function Animals() {
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [isAddingWeight, setIsAddingWeight] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newWeightRange, setNewWeightRange] = useState("")
  const [newBasePrice, setNewBasePrice] = useState("")

  const addNewCategory = () => {
    if (newCategoryName.trim()) {
      console.log("Adding new category:", newCategoryName)
      setNewCategoryName("")
      setIsAddingCategory(false)
    }
  }

  const addWeightRange = (categoryId) => {
    if (newWeightRange.trim() && newBasePrice.trim()) {
      console.log("Adding weight range:", { categoryId, range: newWeightRange, price: newBasePrice })
      setNewWeightRange("")
      setNewBasePrice("")
      setIsAddingWeight(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Animal Categories</h1>
        <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Animal Category</DialogTitle>
              <DialogDescription>Create a new animal category for your farm</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g., Cow, Camel"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
                Cancel
              </Button>
              <Button onClick={addNewCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {animalCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>{category.type}</span>
                  </CardTitle>
                  <CardDescription>{category.weightRanges.length} weight categories available</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {category.weightRanges.reduce((sum, range) => sum + range.available, 0)} available
                  </Badge>
                  <Dialog open={isAddingWeight} onOpenChange={setIsAddingWeight}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Weight Range
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Weight Range</DialogTitle>
                        <DialogDescription>Add a new weight range for {category.type}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="weight-range">Weight Range</Label>
                          <Input
                            id="weight-range"
                            placeholder="e.g., 40-45kg"
                            value={newWeightRange}
                            onChange={(e) => setNewWeightRange(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="base-price">Base Price ($)</Label>
                          <Input
                            id="base-price"
                            type="number"
                            placeholder="e.g., 1800"
                            value={newBasePrice}
                            onChange={(e) => setNewBasePrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingWeight(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => addWeightRange(category.id)}>Add Weight Range</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Weight Range</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.weightRanges.map((range) => (
                    <TableRow key={range.id}>
                      <TableCell className="font-medium">{range.range}</TableCell>
                      <TableCell>${range.basePrice}</TableCell>
                      <TableCell>{range.available}</TableCell>
                      <TableCell>
                        <Badge
                          variant={range.available > 5 ? "default" : range.available > 0 ? "secondary" : "destructive"}
                        >
                          {range.available > 5 ? "In Stock" : range.available > 0 ? "Low Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{animalCategories.length}</div>
            <p className="text-xs text-muted-foreground">Active animal categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight Ranges</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {animalCategories.reduce((sum, cat) => sum + cat.weightRanges.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total weight categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Animals</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {animalCategories.reduce(
                (sum, cat) => sum + cat.weightRanges.reduce((rangeSum, range) => rangeSum + range.available, 0),
                0,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Ready for sale</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Animals
