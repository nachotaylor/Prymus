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
import { Plus, Search, MoreHorizontal, Eye, FileText, FileCheck, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const quotations = [
  {
    id: "COT-001",
    client: "Victor Mateos",
    vehicle: "Ford Ranger XLT 2025",
    date: "2025-01-20",
    quotes: [
      { company: "Allianz", coverage: "C3", premium: 100000 },
      { company: "Allianz", coverage: "CT", premium: 110000 },
      { company: "Berkley", coverage: "B2", premium: 97000 },
      { company: "Berkley", coverage: "RC", premium: 50000 },
      { company: "Rivadavia", coverage: "C3", premium: 99000 },
      { company: "Rivadavia", coverage: "B3", premium: 105000 },
      { company: "Mercantil", coverage: "CT", premium: 104000 },
      { company: "Mercantil", coverage: "B2", premium: 94000 },
    ],
  },
  {
    id: "COT-002",
    client: "María González",
    vehicle: "Chevrolet Cruze LT 2024",
    date: "2025-01-19",
    quotes: [
      { company: "Allianz", coverage: "C3", premium: 85000 },
      { company: "Berkley", coverage: "B2", premium: 82000 },
      { company: "Rivadavia", coverage: "C3", premium: 84000 },
      { company: "Mercantil", coverage: "CT", premium: 88000 },
    ],
  },
  {
    id: "COT-003",
    client: "Carlos Rodríguez",
    vehicle: "Peugeot 208 Active 2023",
    date: "2025-01-18",
    quotes: [
      { company: "Allianz", coverage: "CT", premium: 75000 },
      { company: "Berkley", coverage: "RC", premium: 45000 },
      { company: "Rivadavia", coverage: "B3", premium: 72000 },
      { company: "Mercantil", coverage: "B2", premium: 70000 },
    ],
  },
]

export default function QuotationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [companyFilter, setCompanyFilter] = useState("all")
  const [selectedQuotation] = useState<(typeof quotations)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch =
      quotation.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quotation.vehicle.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCompany = companyFilter === "all" || quotation.quotes.some((q) => q.company === companyFilter)

    return matchesSearch && matchesCompany
  })

  /*
  const handleViewDetail = (quotation: (typeof quotations)[0]) => {
    setSelectedQuotation(quotation)
    setIsDetailOpen(true)
  }
  */

  const handleGeneratePDF = (quotation: (typeof quotations)[0]) => {
    console.log("[v0] Generating PDF for quotation:", quotation.id)
    alert(`Generando PDF para cotización ${quotation.id}`)
  }

  const handleIssuePolicy = (company: string, coverage: string) => {
    console.log("[v0] Issuing policy for company:", company, "coverage:", coverage)
    setIsDetailOpen(false)
    router.push(
      `/dashboard/quotations/issue/${company.toLowerCase()}?quotationId=${selectedQuotation?.id}&coverage=${coverage}`,
    )
  }

  const getLowestPrice = (quotes: (typeof quotations)[0]["quotes"]) => {
    return Math.min(...quotes.map((q) => q.premium))
  }

  const getHighestPrice = (quotes: (typeof quotations)[0]["quotes"]) => {
    return Math.max(...quotes.map((q) => q.premium))
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
              <BreadcrumbPage>Cotizaciones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cotizaciones</h1>
            <p className="text-muted-foreground">Gestiona todas tus cotizaciones de seguros</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/quotations/new">
              <Plus className="mr-2 size-4" />
              Nueva Cotización
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Todas las Cotizaciones</CardTitle>
            <CardDescription>Lista completa de cotizaciones realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por cliente, número o vehículo..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filtrar por compañía" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las compañías</SelectItem>
                  <SelectItem value="Allianz">Allianz</SelectItem>
                  <SelectItem value="Berkley">Berkley</SelectItem>
                  <SelectItem value="Rivadavia">Rivadavia</SelectItem>
                  <SelectItem value="Mercantil">Mercantil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Vehículo</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Rango de Precios</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No se encontraron cotizaciones.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredQuotations.map((quotation) => (
                      <TableRow key={quotation.id}>
                        <TableCell className="font-medium">{quotation.id}</TableCell>
                        <TableCell>{quotation.client}</TableCell>
                        <TableCell>{quotation.vehicle}</TableCell>
                        <TableCell>{new Date(quotation.date).toLocaleDateString("es-AR")}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="size-4 text-muted-foreground" />
                            <span className="text-sm">
                              ${getLowestPrice(quotation.quotes).toLocaleString("es-AR")} - $
                              {getHighestPrice(quotation.quotes).toLocaleString("es-AR")}
                            </span>
                          </div>
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
                              <DropdownMenuItem>
                                <Eye className="mr-2 size-4" />
                                <Link href={{ pathname: "/dashboard/quotations/1" }}>
                                  Ver Detalle
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleGeneratePDF(quotation)}>
                                <FileText className="mr-2 size-4" />
                                Generar PDF
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
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle de Cotización - {selectedQuotation?.id}</DialogTitle>
            <DialogDescription>
              Cliente: {selectedQuotation?.client} | Vehículo: {selectedQuotation?.vehicle}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Número de Cotización</p>
                <p className="text-lg font-semibold">{selectedQuotation?.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                <p className="text-lg font-semibold">
                  {selectedQuotation && new Date(selectedQuotation.date).toLocaleDateString("es-AR")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                <p className="text-lg font-semibold">{selectedQuotation?.client}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vehículo</p>
                <p className="text-lg font-semibold">{selectedQuotation?.vehicle}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <h3 className="text-lg font-semibold mb-4">Cuadro Comparativo de Cotizaciones</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Compañía</TableHead>
                    <TableHead>Cobertura</TableHead>
                    <TableHead className="text-right">Premio</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedQuotation?.quotes.map((quote, index) => {
                    const isLowest =
                      quote.premium === Math.min(...(selectedQuotation?.quotes.map((q) => q.premium) || []))
                    return (
                      <TableRow key={index} className={isLowest ? "bg-green-50" : ""}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {quote.company}
                            {isLowest && (
                              <Badge variant="outline" className="bg-green-100">
                                Mejor Precio
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{quote.coverage}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${quote.premium.toLocaleString("es-AR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleIssuePolicy(quote.company, quote.coverage)}
                          >
                            <FileCheck className="mr-2 size-4" />
                            Emitir
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
              Cerrar
            </Button>
            <Button onClick={() => selectedQuotation && handleGeneratePDF(selectedQuotation)}>
              <FileText className="mr-2 size-4" />
              Generar PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  )
}
