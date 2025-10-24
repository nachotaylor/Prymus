"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

function MercantilIssueContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const quotationId = searchParams.get("quotationId")
  const coverage = searchParams.get("coverage")

  const [step, setStep] = useState<"client" | "inspection" | "policy">("client")
  const [clientType, setClientType] = useState<"new" | "search">("new")
  const [vehicleType, setVehicleType] = useState<"0km" | "used">("used")
  const [medioPago, setMedioPago] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Póliza emitida exitosamente")
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
                <Link href="/dashboard/quotations">Cotizaciones</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <div className="flex items-center gap-2">
                  <img
                    src="https://www.mercantilandina.com.ar/wp-content/uploads/2023/08/Logo-1.svg"
                    alt="Mercantil Andina"
                    className="h-5 object-contain"
                  />
                  Emitir Póliza
                </div>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/quotations">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <img
                src="https://www.mercantilandina.com.ar/wp-content/uploads/2023/08/Logo-1.svg"
                alt="Mercantil Andina"
                className="h-8 object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Cotización: {quotationId} | Cobertura: {coverage}
            </p>
          </div>
        </div>

        <Tabs value={step} onValueChange={(v) => setStep(v as typeof step)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="client">1. Cliente</TabsTrigger>
            <TabsTrigger value="inspection">2. Inspección</TabsTrigger>
            <TabsTrigger value="policy">3. Solicitud Póliza</TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>Selección de Cliente</CardTitle>
                <CardDescription>Seleccione un cliente existente o cree uno nuevo</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={clientType} onValueChange={(v) => setClientType(v as typeof clientType)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">Nuevo Cliente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="search" id="search" />
                    <Label htmlFor="search">Buscar Cliente Existente</Label>
                  </div>
                </RadioGroup>

                {clientType === "new" ? (
                  <form className="mt-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Datos del Asegurado</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">Nombre y Apellido</Label>
                          <Input id="nombre" placeholder="Ingrese nombre y apellido" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tipo_documento">Tipo de Documento</Label>
                          <Select>
                            <SelectTrigger id="tipo_documento">
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="DNI">DNI</SelectItem>
                              <SelectItem value="LE">LE</SelectItem>
                              <SelectItem value="LC">LC</SelectItem>
                              <SelectItem value="CI">CI</SelectItem>
                              <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nro_documento">Número de Documento</Label>
                          <Input id="nro_documento" placeholder="Ingrese el número" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="iva">Condición IVA</Label>
                          <Select>
                            <SelectTrigger id="iva">
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="No Inscripto">No Inscripto</SelectItem>
                              <SelectItem value="Responsable Inscripto">Responsable Inscripto</SelectItem>
                              <SelectItem value="Exento">Exento</SelectItem>
                              <SelectItem value="No responsable">No responsable</SelectItem>
                              <SelectItem value="Consumidor Final">Consumidor Final</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="iibb">Ingresos Brutos</Label>
                          <Select>
                            <SelectTrigger id="iibb">
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="No Inscripto">No Inscripto</SelectItem>
                              <SelectItem value="Inscripto">Inscripto</SelectItem>
                              <SelectItem value="Exento">Exento</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cuil">Número de CUIL/CUIT</Label>
                          <Input id="cuil" placeholder="XX-XXXXXXXX-X" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sexo">Sexo</Label>
                          <Select>
                            <SelectTrigger id="sexo">
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="M">Masculino</SelectItem>
                              <SelectItem value="F">Femenino</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="actividad">Actividad Económica</Label>
                          <Select>
                            <SelectTrigger id="actividad">
                              <SelectValue placeholder="Seleccione una actividad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CARPINTERIA">CARPINTERIA</SelectItem>
                              <SelectItem value="PANADERIA">PANADERIA</SelectItem>
                              <SelectItem value="METALURGICA">METALURGICA</SelectItem>
                              <SelectItem value="LAVANDERIA">LAVANDERIA</SelectItem>
                              <SelectItem value="FARMACIA">FARMACIA</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Domicilio</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="localidad">Localidad</Label>
                          <Input id="localidad" placeholder="Ingrese la localidad" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="calle">Calle</Label>
                          <Input id="calle" placeholder="Ingrese la calle" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="numero">Número</Label>
                          <Input id="numero" placeholder="Número" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="departamento">Departamento (Opcional)</Label>
                          <Input id="departamento" placeholder="Departamento" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="piso">Piso (Opcional)</Label>
                          <Input id="piso" placeholder="Piso" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setStep("inspection")}>
                        Continuar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="search_name">Buscar por Nombre</Label>
                      <Input id="search_name" placeholder="Ingrese el nombre del cliente" />
                    </div>
                    <Button type="button">Buscar</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inspection">
            <Card>
              <CardHeader>
                <CardTitle>Solicitud de Inspección</CardTitle>
                <CardDescription>Cargue las imágenes del vehículo o certificado de no rodamiento</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={vehicleType} onValueChange={(v) => setVehicleType(v as typeof vehicleType)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0km" id="0km" />
                    <Label htmlFor="0km">Vehículo 0 KM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="used" id="used" />
                    <Label htmlFor="used">Vehículo Usado</Label>
                  </div>
                </RadioGroup>

                {vehicleType === "0km" ? (
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificado">Certificado de No Rodamiento</Label>
                      <div className="flex items-center gap-2">
                        <Input id="certificado" type="file" accept=".pdf,.jpg,.png" />
                        <Button type="button" size="icon" variant="outline">
                          <Upload className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="frente">Imagen Frente</Label>
                        <Input id="frente" type="file" accept=".jpg,.png" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trasera">Imagen Trasera</Label>
                        <Input id="trasera" type="file" accept=".jpg,.png" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lateral_conductor">Imagen Lateral Conductor</Label>
                        <Input id="lateral_conductor" type="file" accept=".jpg,.png" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lateral_acompanante">Imagen Lateral Acompañante</Label>
                        <Input id="lateral_acompanante" type="file" accept=".jpg,.png" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep("client")}>
                    Anterior
                  </Button>
                  <Button type="button" onClick={() => setStep("policy")}>
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policy">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Medios de Pago</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="medio_pago">Medio de Pago</Label>
                    <Select value={medioPago} onValueChange={setMedioPago}>
                      <SelectTrigger id="medio_pago">
                        <SelectValue placeholder="Seleccione el medio de pago" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="efectivo">Efectivo</SelectItem>
                        <SelectItem value="tarjeta">Tarjeta de Crédito</SelectItem>
                        <SelectItem value="transferencia">Transferencia</SelectItem>
                        <SelectItem value="debito">Débito Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {medioPago === "tarjeta" && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="numero_tarjeta">Número de Tarjeta</Label>
                        <Input id="numero_tarjeta" placeholder="Ingrese número de tarjeta" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fecha_vencimiento">Fecha de Vencimiento</Label>
                        <Input id="fecha_vencimiento" type="month" />
                      </div>
                    </div>
                  )}

                  {medioPago === "debito" && (
                    <div className="space-y-2">
                      <Label htmlFor="cbu">CBU</Label>
                      <Input id="cbu" placeholder="Ingrese CBU" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tomador</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dni_cliente">DNI</Label>
                      <Input id="dni_cliente" placeholder="Número de DNI" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sexo_cliente">Sexo</Label>
                      <Select>
                        <SelectTrigger id="sexo_cliente">
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Femenino</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vehículo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="dominio">Dominio</Label>
                      <Input id="dominio" placeholder="ABC123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chasis">Chasis</Label>
                      <Input id="chasis" placeholder="Número de chasis" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motor">Número de Motor</Label>
                      <Input id="motor" placeholder="Número de motor" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep("inspection")}>
                  Anterior
                </Button>
                <Button type="submit">Emitir Póliza</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}

export default function MercantilIssuePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <MercantilIssueContent />
    </Suspense>
  )
}
