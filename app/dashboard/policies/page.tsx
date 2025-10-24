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
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Eye, CheckCircle2, AlertCircle, Download } from "lucide-react"
import Link from "next/link"

const policies = [
  {
    policyNumber: "SDS-AUTO-2025-001",
    client: "Juan Pérez",
    dni: "35123456",
    company: "Allianz",
    coverage: "C3",
    premium: "$100.000",
    status: "active",
    startDate: "2025-01-15",
    endDate: "2026-01-15",
  },
  {
    policyNumber: "LCS-HOG-2025-002",
    client: "María González",
    dni: "38456789",
    company: "Berkley",
    coverage: "CT",
    premium: "$85.000",
    status: "active",
    startDate: "2025-01-10",
    endDate: "2026-01-10",
  },
  {
    policyNumber: "SR-VIDA-2024-156",
    client: "Carlos Rodríguez",
    dni: "32987654",
    company: "Rivadavia",
    coverage: "B2",
    premium: "$97.000",
    status: "expiring",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
  },
  {
    policyNumber: "FP-AUTO-2024-089",
    client: "Ana Martínez",
    dni: "40123789",
    company: "Mercantil",
    coverage: "RC",
    premium: "$50.000",
    status: "active",
    startDate: "2024-01-20",
    endDate: "2026-01-20",
  },
  {
    policyNumber: "SDS-COM-2025-003",
    client: "Luis Fernández",
    dni: "29876543",
    company: "Allianz",
    coverage: "B1",
    premium: "$104.000",
    status: "active",
    startDate: "2025-01-05",
    endDate: "2026-01-05",
  },
]

const statusConfig = {
  active: { label: "Vigente", className: "bg-green-500/10 text-green-600 hover:bg-green-500/20" },
  expiring: { label: "Por Vencer", className: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20" },
  expired: { label: "Vencida", className: "bg-red-500/10 text-red-600 hover:bg-red-500/20" },
  cancelled: { label: "Cancelada", className: "bg-gray-500/10 text-gray-600 hover:bg-gray-500/20" },
}

export default function PoliciesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState<string>("all")
  const [nameFilter, setNameFilter] = useState("")
  const [dniFilter, setDniFilter] = useState("")
  const [selectedPolicy, setSelectedPolicy] = useState<(typeof policies)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCompany = companyFilter === "all" || policy.company === companyFilter
    const matchesName = policy.client.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesDni = policy.dni.includes(dniFilter)
    const matchesStatus = statusFilter === "all" || policy.status === statusFilter

    return matchesSearch && matchesCompany && matchesName && matchesDni && matchesStatus
  })

  const stats = {
    active: policies.filter((p) => p.status === "active").length,
    expiring: policies.filter((p) => p.status === "expiring").length,
  }

  const handleViewDetail = (policy: (typeof policies)[0]) => {
    setSelectedPolicy(policy)
    setIsDetailOpen(true)
  }

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
              <BreadcrumbPage>Pólizas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pólizas</h1>
            <p className="text-muted-foreground">Gestiona todas las pólizas de seguros</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pólizas Vigentes</CardTitle>
              <CheckCircle2 className="size-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
              <p className="text-xs text-muted-foreground">Activas y en regla</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Por Vencer</CardTitle>
              <AlertCircle className="size-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.expiring}</div>
              <p className="text-xs text-muted-foreground">Próximas a vencer</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Todas las Pólizas</CardTitle>
            <CardDescription>Lista completa de pólizas emitidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por cliente o número de póliza..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="active">Vigentes</SelectItem>
                    <SelectItem value="expiring">Por Vencer</SelectItem>
                    <SelectItem value="expired">Vencidas</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Compañía" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las compañías</SelectItem>
                    <SelectItem value="Berkley">Berkley</SelectItem>
                    <SelectItem value="Allianz">Allianz</SelectItem>
                    <SelectItem value="Rivadavia">Rivadavia</SelectItem>
                    <SelectItem value="Mercantil">Mercantil</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="text"
                  placeholder="Filtrar por nombre"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />

                <Input
                  type="text"
                  placeholder="Filtrar por DNI"
                  value={dniFilter}
                  onChange={(e) => setDniFilter(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                  setCompanyFilter("all")
                  setNameFilter("")
                  setDniFilter("")
                }}
              >
                Limpiar Filtros
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número de Póliza</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>Compañía</TableHead>
                    <TableHead>Cobertura</TableHead>
                    <TableHead>Prima</TableHead>
                    <TableHead>Vigencia</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPolicies.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No se encontraron pólizas.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPolicies.map((policy) => (
                      <TableRow key={policy.policyNumber}>
                        <TableCell className="font-mono text-xs">{policy.policyNumber}</TableCell>
                        <TableCell>{policy.client}</TableCell>
                        <TableCell>{policy.dni}</TableCell>
                        <TableCell>{policy.company}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{policy.coverage}</Badge>
                        </TableCell>
                        <TableCell>{policy.premium}</TableCell>
                        <TableCell className="text-xs">
                          <div>{new Date(policy.startDate).toLocaleDateString("es-AR")}</div>
                          <div className="text-muted-foreground">
                            {new Date(policy.endDate).toLocaleDateString("es-AR")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={statusConfig[policy.status as keyof typeof statusConfig].className}
                          >
                            {statusConfig[policy.status as keyof typeof statusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                                <span className="sr-only">Abrir menú</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetail(policy)}>
                                <Eye className="mr-2 size-4" />
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 size-4" />
                                Descargar Póliza
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalle de Póliza</DialogTitle>
            <DialogDescription>{selectedPolicy?.policyNumber}</DialogDescription>
          </DialogHeader>

          {selectedPolicy && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Número de Póliza</p>
                  <p className="text-lg font-semibold">{selectedPolicy.policyNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <Badge className={statusConfig[selectedPolicy.status as keyof typeof statusConfig].className}>
                    {statusConfig[selectedPolicy.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                  <p className="text-lg font-semibold">{selectedPolicy.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">DNI</p>
                  <p className="text-lg font-semibold">{selectedPolicy.dni}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compañía</p>
                  <p className="text-lg font-semibold">{selectedPolicy.company}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cobertura</p>
                  <Badge variant="outline">{selectedPolicy.coverage}</Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prima</p>
                  <p className="text-lg font-semibold">{selectedPolicy.premium}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vigencia</p>
                  <p className="text-sm">
                    {new Date(selectedPolicy.startDate).toLocaleDateString("es-AR")} -{" "}
                    {new Date(selectedPolicy.endDate).toLocaleDateString("es-AR")}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Cerrar
                </Button>
                <Button>
                  <Download className="mr-2 size-4" />
                  Descargar Póliza
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarInset>
  )
}
