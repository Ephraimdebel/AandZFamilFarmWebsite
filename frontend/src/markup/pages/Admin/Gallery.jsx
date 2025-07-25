"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/admin/ui/card"
import { Badge } from "../../components/admin/ui/badge"
import { Button } from "../../components/admin/ui/button"
import { Input } from "../../components/admin/ui/input"
import { Label } from "../../components/admin/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/admin/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/admin/ui/dialog"
import { Upload, ImageIcon, Trash2, Eye, Filter } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    url: "/placeholder.svg?height=200&width=300",
    title: "Premium Sheep - 25-30kg",
    category: "Sheep",
    weightRange: "25-30kg",
    uploadDate: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=200&width=300",
    title: "Young Goat - 15-20kg",
    category: "Goat",
    weightRange: "15-20kg",
    uploadDate: "2024-01-14",
    status: "active",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=200&width=300",
    title: "Large Sheep - 30-35kg",
    category: "Sheep",
    weightRange: "30-35kg",
    uploadDate: "2024-01-13",
    status: "active",
  },
  {
    id: 4,
    url: "/placeholder.svg?height=200&width=300",
    title: "Medium Goat - 20-25kg",
    category: "Goat",
    weightRange: "20-25kg",
    uploadDate: "2024-01-12",
    status: "active",
  },
  {
    id: 5,
    url: "/placeholder.svg?height=200&width=300",
    title: "Small Sheep - 20-25kg",
    category: "Sheep",
    weightRange: "20-25kg",
    uploadDate: "2024-01-11",
    status: "inactive",
  },
  {
    id: 6,
    url: "/placeholder.svg?height=200&width=300",
    title: "Large Goat - 25-30kg",
    category: "Goat",
    weightRange: "25-30kg",
    uploadDate: "2024-01-10",
    status: "active",
  },
]

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    weightRange: "",
    file: null,
  })

  const filteredImages = galleryImages.filter((image) => {
    const matchesCategory = filterCategory === "all" || image.category.toLowerCase() === filterCategory
    const matchesStatus = filterStatus === "all" || image.status === filterStatus
    return matchesCategory && matchesStatus
  })

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadForm({ ...uploadForm, file })
    }
  }

  const handleUpload = () => {
    if (uploadForm.file && uploadForm.title && uploadForm.category && uploadForm.weightRange) {
      console.log("Uploading image:", uploadForm)
      setIsUploading(false)
      setUploadForm({
        title: "",
        category: "",
        weightRange: "",
        file: null,
      })
    }
  }

  const deleteImage = (imageId) => {
    console.log("Deleting image:", imageId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
        <Dialog open={isUploading} onOpenChange={setIsUploading}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
              <DialogDescription>Add a new image to your animal gallery</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-title">Image Title</Label>
                <Input
                  id="image-title"
                  placeholder="e.g., Premium Sheep - 25-30kg"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Animal Category</Label>
                  <Select
                    value={uploadForm.category}
                    onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                    placeholder="e.g., 25-30kg"
                    value={uploadForm.weightRange}
                    onChange={(e) => setUploadForm({ ...uploadForm, weightRange: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-file">Image File</Label>
                <Input id="image-file" type="file" accept="image/*" onChange={handleFileUpload} />
                {uploadForm.file && <p className="text-sm text-muted-foreground">Selected: {uploadForm.file.name}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploading(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpload}>Upload Image</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="sheep">Sheep</SelectItem>
                  <SelectItem value="goat">Goat</SelectItem>
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
                  setFilterCategory("all")
                  setFilterStatus("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryImages.length}</div>
            <p className="text-xs text-muted-foreground">In gallery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryImages.filter((img) => img.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently displayed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sheep Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryImages.filter((img) => img.category === "Sheep").length}</div>
            <p className="text-xs text-muted-foreground">Sheep category</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goat Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryImages.filter((img) => img.category === "Goat").length}</div>
            <p className="text-xs text-muted-foreground">Goat category</p>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery */}
      <Card>
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>Manage your animal images ({filteredImages.length} images shown)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge variant={image.status === "active" ? "default" : "secondary"}>{image.status}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{image.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{image.category}</span>
                      <span>{image.weightRange}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Uploaded: {image.uploadDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedImage(image)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{selectedImage?.title}</DialogTitle>
                            <DialogDescription>Image details and preview</DialogDescription>
                          </DialogHeader>
                          {selectedImage && (
                            <div className="space-y-4">
                              <div className="relative aspect-video">
                                <img
                                  src={selectedImage.url || "/placeholder.svg"}
                                  alt={selectedImage.title}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Category</Label>
                                  <p className="text-sm text-muted-foreground">{selectedImage.category}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Weight Range</Label>
                                  <p className="text-sm text-muted-foreground">{selectedImage.weightRange}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Upload Date</Label>
                                  <p className="text-sm text-muted-foreground">{selectedImage.uploadDate}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Status</Label>
                                  <Badge variant={selectedImage.status === "active" ? "default" : "secondary"}>
                                    {selectedImage.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => deleteImage(image.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Gallery
