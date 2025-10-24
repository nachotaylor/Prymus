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
import { Plus, Search, MoreHorizontal, Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const producers = [
  {
    id: "PROD-001",
    name: "Juan Carlos López",
    email: "juan.lopez@email.com",
    phone: "+54 9 11 2345-6789",
    status: "active",
    quotations: 12,
    policies: 8,
    joinDate: "2024-01-15",
  },
  {
    id: "PROD-002",
    name: "María Rodríguez",
    email: "maria.rodriguez@email.com",
    phone: "+54 9 11 3456-7890",
    status: "active",
    quotations: 18,
    policies: 14,
    joinDate: "2023-11-20",
  },
  {
    id: "PROD-003",
    name: "Carlos Martínez",
    email: "carlos.martinez@email.com",
    phone: "+54 9 11 4567-8901",
    status: "inactive",
    quotations: 5,
    policies: 3,
    joinDate: "2024-03-10",
  },
  {
    id: "PROD-004",
    name: "Ana García",
    email: "ana.garcia@email.com",
    phone: "+54 9 11 5678-9012",
    status: "active",
    quotations: 22,
    policies: 18,
    joinDate: "2023-09-05",
  },
]

const statusConfig = {
  active: { label: "Activo", className: "bg-green-500/10 text-green-600" },
  inactive: { label: "Inactivo", className: "bg-gray-500/10 text-gray-600" },
}

export default function ProducersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducers = producers.filter(
    (producer) =>
      producer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <BreadcrumbLink asChild>
                <Link href="/dashboard/management">Gestión</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Productores</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/management">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Productores</h1>
            <p className="text-muted-foreground">Administra los productores de seguros</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Lista de Productores</CardTitle>
                <CardDescription>Gestiona todos los productores registrados</CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/management/producers/new">
                  <Plus className="mr-2 size-4" />
                  Nuevo Productor
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nombre, email o ID..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Cotizaciones</TableHead>
                    <TableHead>Pólizas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No se encontraron productores.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducers.map((producer) => (
                      <TableRow key={producer.id}>
                        <TableCell className="font-mono text-xs">{producer.id}</TableCell>
                        <TableCell className="font-medium">{producer.name}</TableCell>
                        <TableCell className="text-sm">{producer.email}</TableCell>
                        <TableCell className="text-sm">{producer.phone}</TableCell>
                        <TableCell className="text-center">{producer.quotations}</TableCell>
                        <TableCell className="text-center">{producer.policies}</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[producer.status as keyof typeof statusConfig].className}>
                            {statusConfig[producer.status as keyof typeof statusConfig].label}
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
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/management/producers/new?id=${producer.id}`}>
                                  <Edit className="mr-2 size-4" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 size-4" />
                                Eliminar
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
    </SidebarInset>
  )
}
