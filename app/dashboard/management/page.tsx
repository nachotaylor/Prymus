"use client"

import { useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Users, BarChart3, TrendingUp, Download } from "lucide-react"
import Link from "next/link"

const producerPoliciesData = [
  { producer: "Victor Mateos", policies: 8, quotations: 12, conversion: "67%", commission: "$12,500" },
  { producer: "María González", policies: 6, quotations: 9, conversion: "67%", commission: "$9,200" },
  { producer: "Carlos Rodríguez", policies: 5, quotations: 8, conversion: "63%", commission: "$7,800" },
  { producer: "Ana Martínez", policies: 4, quotations: 7, conversion: "57%", commission: "$6,100" },
  { producer: "Luis Fernández", policies: 7, quotations: 10, conversion: "70%", commission: "$10,900" },
]

const quotationsByProducerData = [
  { producer: "Victor Mateos", quotations: 12, emitted: 8, pending: 4 },
  { producer: "María González", quotations: 9, emitted: 6, pending: 3 },
  { producer: "Carlos Rodríguez", quotations: 8, emitted: 5, pending: 3 },
  { producer: "Ana Martínez", quotations: 7, emitted: 4, pending: 3 },
  { producer: "Luis Fernández", quotations: 10, emitted: 7, pending: 3 },
]

const commissionData = [
  { producer: "Victor Mateos", commission: 12500, target: 15000 },
  { producer: "María González", commission: 9200, target: 12000 },
  { producer: "Carlos Rodríguez", commission: 7800, target: 10000 },
  { producer: "Ana Martínez", commission: 6100, target: 8000 },
  { producer: "Luis Fernández", commission: 10900, target: 13000 },
]

const comparisonData = [
  { producer: "Victor Mateos", quotations: 12, policies: 8 },
  { producer: "María González", quotations: 9, policies: 6 },
  { producer: "Carlos Rodríguez", quotations: 8, policies: 5 },
  { producer: "Ana Martínez", quotations: 7, policies: 4 },
  { producer: "Luis Fernández", quotations: 10, policies: 7 },
]

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState("producers")

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Gestión</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión</h1>
            <p className="text-muted-foreground">Administra productores y visualiza reportes</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="producers" className="flex items-center gap-2">
              <Users className="size-4" />
              Productores
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="size-4" />
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="producers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Productores</CardTitle>
                <CardDescription>Administra los productores de seguros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                  <Button asChild>
                    <Link href="/dashboard/management/producers/new">Nuevo Productor</Link>
                  </Button>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Cargando lista de productores...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cotizaciones Totales</CardTitle>
                  <TrendingUp className="size-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">51</div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pólizas Emitidas</CardTitle>
                  <TrendingUp className="size-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30</div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Comisiones Totales</CardTitle>
                  <TrendingUp className="size-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$46,500</div>
                  <p className="text-xs text-muted-foreground">Este mes</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pólizas Emitidas por Productor</CardTitle>
                <CardDescription>Detalle de pólizas y comisiones generadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Productor</TableHead>
                        <TableHead className="text-right">Pólizas</TableHead>
                        <TableHead className="text-right">Cotizaciones</TableHead>
                        <TableHead className="text-right">Conversión</TableHead>
                        <TableHead className="text-right">Comisión</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {producerPoliciesData.map((row) => (
                        <TableRow key={row.producer}>
                          <TableCell className="font-medium">{row.producer}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">{row.policies}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{row.quotations}</TableCell>
                          <TableCell className="text-right">
                            <Badge className="bg-green-500/10 text-green-600">{row.conversion}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{row.commission}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cotizaciones por Productor</CardTitle>
                <CardDescription>Estado de cotizaciones emitidas y pendientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Productor</TableHead>
                        <TableHead className="text-right">Total Cotizaciones</TableHead>
                        <TableHead className="text-right">Emitidas</TableHead>
                        <TableHead className="text-right">Pendientes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotationsByProducerData.map((row) => (
                        <TableRow key={row.producer}>
                          <TableCell className="font-medium">{row.producer}</TableCell>
                          <TableCell className="text-right">{row.quotations}</TableCell>
                          <TableCell className="text-right">
                            <Badge className="bg-green-500/10 text-green-600">{row.emitted}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className="bg-yellow-500/10 text-yellow-600">{row.pending}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comisiones Generadas</CardTitle>
                <CardDescription>Comparativa de comisiones vs meta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Productor</TableHead>
                        <TableHead className="text-right">Comisión Generada</TableHead>
                        <TableHead className="text-right">Meta</TableHead>
                        <TableHead className="text-right">% de Meta</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {commissionData.map((row) => {
                        const percentage = Math.round((row.commission / row.target) * 100)
                        return (
                          <TableRow key={row.producer}>
                            <TableCell className="font-medium">{row.producer}</TableCell>
                            <TableCell className="text-right font-semibold">
                              ${row.commission.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right">${row.target.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Badge
                                className={
                                  percentage >= 100
                                    ? "bg-green-500/10 text-green-600"
                                    : percentage >= 80
                                      ? "bg-yellow-500/10 text-yellow-600"
                                      : "bg-red-500/10 text-red-600"
                                }
                              >
                                {percentage}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cotizaciones vs Pólizas Emitidas</CardTitle>
                <CardDescription>
                  Comparativa de cotizaciones procesadas y pólizas emitidas por productor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="producer" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quotations" fill="#3b82f6" name="Cotizaciones" />
                      <Bar dataKey="policies" fill="#10b981" name="Pólizas Emitidas" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="size-4" />
                Descargar Reportes
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
