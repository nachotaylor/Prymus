import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Car } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Cotizaciones Activas",
      value: "24",
      description: "+12% desde el mes pasado",
      icon: FileText,
      trend: "+12%",
    },
    {
      title: "Emisiones",
      value: "156",
      description: "",
      icon: Shield,
      trend: "+8%",
    },
  ]

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido a tu plataforma de gestión de seguros</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas cotizaciones y pólizas procesadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Cotización",
                  client: "Victo Mateos",
                  product: "Seguro de Auto",
                  date: "Hace 2 horas",
                },
                {
                  type: "Póliza",
                  client: "María González",
                  product: "Seguro de Auto",
                  date: "Hace 5 horas",
                },
                {
                  type: "Cotización",
                  client: "Carlos Rodríguez",
                  product: "Seguro de Auto",
                  date: "Hace 1 día",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                    <Car className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.type} - {activity.client}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.product}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
