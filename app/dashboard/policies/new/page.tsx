"use client"

import type React from "react"

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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function NewPolicyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("[v0] Policy created successfully")
    router.push("/dashboard/policies")
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
              <BreadcrumbLink asChild>
                <Link href="/dashboard/policies">Pólizas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nueva Póliza</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/policies">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nueva Póliza</h1>
            <p className="text-muted-foreground">Completa los datos para emitir una nueva póliza</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Información del Cliente</CardTitle>
                <CardDescription>Datos del asegurado</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Nombre Completo *</Label>
                  <Input id="client-name" placeholder="Juan Pérez" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-dni">DNI/CUIT *</Label>
                  <Input id="client-dni" placeholder="20-12345678-9" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email *</Label>
                  <Input id="client-email" type="email" placeholder="cliente@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Teléfono *</Label>
                  <Input id="client-phone" type="tel" placeholder="+54 9 11 1234-5678" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="client-address">Dirección *</Label>
                  <Input id="client-address" placeholder="Av. Corrientes 1234, CABA" required />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Detalles de la Póliza</CardTitle>
                <CardDescription>Información del seguro contratado</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="policy-number">Número de Póliza *</Label>
                  <Input id="policy-number" placeholder="SDS-AUTO-2025-001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance-type">Tipo de Seguro *</Label>
                  <Select required>
                    <SelectTrigger id="insurance-type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Seguro de Auto</SelectItem>
                      <SelectItem value="hogar">Seguro de Hogar</SelectItem>
                      <SelectItem value="vida">Seguro de Vida</SelectItem>
                      <SelectItem value="comercio">Seguro de Comercio</SelectItem>
                      <SelectItem value="ap">Accidentes Personales</SelectItem>
                      <SelectItem value="rc">Responsabilidad Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Compañía Aseguradora *</Label>
                  <Select required>
                    <SelectTrigger id="company">
                      <SelectValue placeholder="Seleccionar compañía" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sur">Seguros del Sur</SelectItem>
                      <SelectItem value="caja">La Caja Seguros</SelectItem>
                      <SelectItem value="rivadavia">Seguros Rivadavia</SelectItem>
                      <SelectItem value="patronal">Federación Patronal</SelectItem>
                      <SelectItem value="sancor">Sancor Seguros</SelectItem>
                      <SelectItem value="zurich">Zurich Argentina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverage">Cobertura *</Label>
                  <Select required>
                    <SelectTrigger id="coverage">
                      <SelectValue placeholder="Seleccionar cobertura" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="terceros">Terceros Completo</SelectItem>
                      <SelectItem value="terceros-basico">Terceros Básico</SelectItem>
                      <SelectItem value="todo-riesgo">Todo Riesgo</SelectItem>
                      <SelectItem value="todo-riesgo-franquicia">Todo Riesgo con Franquicia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fecha de Inicio *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {startDate ? format(startDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Fecha de Vencimiento *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {endDate ? format(endDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sum-insured">Suma Asegurada *</Label>
                  <Input id="sum-insured" type="number" placeholder="1000000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="premium">Prima Mensual *</Label>
                  <Input id="premium" type="number" placeholder="1200" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Forma de Pago *</Label>
                  <Select required>
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Seleccionar forma de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mensual">Mensual</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="semestral">Semestral</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission">Comisión del Productor (%)</Label>
                  <Input id="commission" type="number" placeholder="15" min="0" max="100" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Observaciones</Label>
                  <Textarea id="notes" placeholder="Notas adicionales sobre la póliza..." className="min-h-[100px]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/policies">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 size-4" />
              {isSubmitting ? "Emitiendo..." : "Emitir Póliza"}
            </Button>
          </div>
        </form>
      </div>
    </SidebarInset>
  )
}
