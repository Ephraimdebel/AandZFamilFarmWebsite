import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/admin/ui/card"

function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Configure your farm management system</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings
