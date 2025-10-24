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
              <BreadcrumbPage>Emitir Póliza - Mercantil Andina</BreadcrumbPage>
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
            <h1 className="text-3xl font-bold tracking-tight">Emitir Póliza - Mercantil Andina</h1>
            <p className="text-muted-foreground">
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
                  <form className="mt-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" placeholder="Ingrese el nombre" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input id="apellido" placeholder="Ingrese el apellido" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
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
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nro_documento">Número de Documento</Label>
                        <Input id="nro_documento" placeholder="Ingrese el número" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cuil">Número de CUIL</Label>
                        <Input id="cuil" placeholder="XX-XXXXXXXX-X" />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                        <Input id="fecha_nacimiento" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" placeholder="Ingrese el teléfono" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="correo@ejemplo.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="localidad">Domicilio - Localidad</Label>
                      <Input id="localidad" placeholder="Ingrese la localidad" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="calle">Domicilio - Calle</Label>
                        <Input id="calle" placeholder="Ingrese la calle" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numero">Domicilio - Número</Label>
                        <Input id="numero" placeholder="Número" />
                      </div>
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
                          <SelectItem value="FERRETERIA">FERRETERIA</SelectItem>
                          <SelectItem value="PERIODICO">PERIODICO</SelectItem>
                          <SelectItem value="RADIODIFUSORA">RADIODIFUSORA</SelectItem>
                          <SelectItem value="TELEVISION">TELEVISION</SelectItem>
                          <SelectItem value="AGENCIA DE PUBLICIDAD">AGENCIA DE PUBLICIDAD</SelectItem>
                          <SelectItem value="COMPAÑIA ASEGURADORA">COMPAÑIA ASEGURADORA</SelectItem>
                          <SelectItem value="AGENCIA DE TURISMO">AGENCIA DE TURISMO</SelectItem>
                          <SelectItem value="IMPRENTA">IMPRENTA</SelectItem>
                          <SelectItem value="CONCESIONARIA DE AUTOMOTORES">CONCESIONARIA DE AUTOMOTORES</SelectItem>
                          <SelectItem value="SUPERMERCADO MINORISTA">SUPERMERCADO MINORISTA</SelectItem>
                          <SelectItem value="SUPERMERCADO MAYORISTA">SUPERMERCADO MAYORISTA</SelectItem>
                          <SelectItem value="ENTIDAD FINANCIERA">ENTIDAD FINANCIERA</SelectItem>
                          <SelectItem value="CENTRO MEDICO">CENTRO MEDICO</SelectItem>
                          <SelectItem value="ENTIDAD EDUCATIVA">ENTIDAD EDUCATIVA</SelectItem>
                          <SelectItem value="CONSIGNATARIO DE HACIENDA">CONSIGNATARIO DE HACIENDA</SelectItem>
                          <SelectItem value="CEREALERA">CEREALERA</SelectItem>
                          <SelectItem value="CONSIGNATARIO AGRO/GANADERO">CONSIGNATARIO AGRO/GANADERO</SelectItem>
                          <SelectItem value="CONSTRUCTORA">CONSTRUCTORA</SelectItem>
                          <SelectItem value="ESTUDIO CONTABLE">ESTUDIO CONTABLE</SelectItem>
                          <SelectItem value="ESTUDIO JURIDICO">ESTUDIO JURIDICO</SelectItem>
                          <SelectItem value="ESTUDIO JURIDICO/CONTABLE">ESTUDIO JURIDICO/CONTABLE</SelectItem>
                          <SelectItem value="COOPERATIVA AGRICOLA">COOPERATIVA AGRICOLA</SelectItem>
                          <SelectItem value="COOPERATIVA DE SEGUROS">COOPERATIVA DE SEGUROS</SelectItem>
                          <SelectItem value="COOPERATIVA DE SERVICIOS">COOPERATIVA DE SERVICIOS</SelectItem>
                          <SelectItem value="EMPRESA TRANSPORTISTA">EMPRESA TRANSPORTISTA</SelectItem>
                          <SelectItem value="ESTACION DE SERVICIO">ESTACION DE SERVICIO</SelectItem>
                          <SelectItem value="ESTUDIO DE FOTOGRAFIA">ESTUDIO DE FOTOGRAFIA</SelectItem>
                          <SelectItem value="ESTUDIO DE VIDEOPRODUCCIONES">ESTUDIO DE VIDEOPRODUCCIONES</SelectItem>
                          <SelectItem value="HOTEL">HOTEL</SelectItem>
                          <SelectItem value="INDUSTRIA ALIMENTICIA">INDUSTRIA ALIMENTICIA</SelectItem>
                          <SelectItem value="INMOBILIARIA">INMOBILIARIA</SelectItem>
                          <SelectItem value="LOCUTORIO TELEFONICO">LOCUTORIO TELEFONICO</SelectItem>
                          <SelectItem value="OPTICA">OPTICA</SelectItem>
                          <SelectItem value="HELADERIA">HELADERIA</SelectItem>
                          <SelectItem value="PELUQUERIA">PELUQUERIA</SelectItem>
                          <SelectItem value="CONFITERIA">CONFITERIA</SelectItem>
                          <SelectItem value="BICICLETERIA">BICICLETERIA</SelectItem>
                          <SelectItem value="LIBRERIA">LIBRERIA</SelectItem>
                          <SelectItem value="VIVERO">VIVERO</SelectItem>
                          <SelectItem value="RESTAURANT">RESTAURANT</SelectItem>
                          <SelectItem value="ACOPIADOR">ACOPIADOR</SelectItem>
                          <SelectItem value="TIENDA">TIENDA</SelectItem>
                          <SelectItem value="CORRALON DE MATERIALES">CORRALON DE MATERIALES</SelectItem>
                          <SelectItem value="VENTA DE ART.DEL HOGAR">VENTA DE ART.DEL HOGAR</SelectItem>
                          <SelectItem value="FABRICA DE SODA Y AGUAS">FABRICA DE SODA Y AGUAS</SelectItem>
                          <SelectItem value="TALLER MECANICO">TALLER MECANICO</SelectItem>
                          <SelectItem value="PINTURERIA">PINTURERIA</SelectItem>
                          <SelectItem value="SERVICIOS FUNEBRES">SERVICIOS FUNEBRES</SelectItem>
                          <SelectItem value="CARNICERIA">CARNICERIA</SelectItem>
                          <SelectItem value="VITIVINICOLA">VITIVINICOLA</SelectItem>
                          <SelectItem value="YERBATERA">YERBATERA</SelectItem>
                          <SelectItem value="TABACALERA">TABACALERA</SelectItem>
                          <SelectItem value="EXPLOTACION AGRO-GANADERA">EXPLOTACION AGRO-GANADERA</SelectItem>
                          <SelectItem value="EXPLOTACION PESQUERA">EXPLOTACION PESQUERA</SelectItem>
                          <SelectItem value="EXPLOTACION MINERA">EXPLOTACION MINERA</SelectItem>
                          <SelectItem value="PAPELERA">PAPELERA</SelectItem>
                          <SelectItem value="CAUCHO (FABRICACION)">CAUCHO (FABRICACION)</SelectItem>
                          <SelectItem value="CAUCHO (VENTA Y/O REPARACION)">CAUCHO (VENTA Y/O REPARACION)</SelectItem>
                          <SelectItem value="SUBSTANCIAS Y PROD. QUIMICOS">SUBSTANCIAS Y PROD. QUIMICOS</SelectItem>
                          <SelectItem value="MANUFACTURA PRODS. PESQUEROS">MANUFACTURA PRODS. PESQUEROS</SelectItem>
                          <SelectItem value="BAZAR">BAZAR</SelectItem>
                          <SelectItem value="FAB MATERIAL DE CONSTRUCCION">FAB MATERIAL DE CONSTRUCCION</SelectItem>
                          <SelectItem value="ZAPATERIA">ZAPATERIA</SelectItem>
                          <SelectItem value="KIOSCO">KIOSCO</SelectItem>
                          <SelectItem value="CIRCULO MEDICO">CIRCULO MEDICO</SelectItem>
                          <SelectItem value="MAQUINARIAS AGRICOLAS CPRA/VTA">MAQUINARIAS AGRICOLAS CPRA/VTA</SelectItem>
                          <SelectItem value="PAPAS ACOPIO Y FRIO">PAPAS ACOPIO Y FRIO</SelectItem>
                          <SelectItem value="MUSEO">MUSEO</SelectItem>
                          <SelectItem value="RECTIFICACION DE MOTORES">RECTIFICACION DE MOTORES</SelectItem>
                          <SelectItem value="ELECTRICIDAD DE AUTOMOTORES">ELECTRICIDAD DE AUTOMOTORES</SelectItem>
                          <SelectItem value="FABRICA DE BOLSAS">FABRICA DE BOLSAS</SelectItem>
                          <SelectItem value="VETERINARIA">VETERINARIA</SelectItem>
                          <SelectItem value="FABRICA DE AUTO DE COMPETICION">FABRICA DE AUTO DE COMPETICION</SelectItem>
                          <SelectItem value="CRIADERO DE POLLOS">CRIADERO DE POLLOS</SelectItem>
                          <SelectItem value="DISTRIBUIDORA DE EMBUTIDOS">DISTRIBUIDORA DE EMBUTIDOS</SelectItem>
                          <SelectItem value="TAPICERIA">TAPICERIA</SelectItem>
                          <SelectItem value="FABRICA TEXTIL">FABRICA TEXTIL</SelectItem>
                          <SelectItem value="PIZZERIA">PIZZERIA</SelectItem>
                          <SelectItem value="DISTRIBUIDORA DE COMBUSTIBLES">DISTRIBUIDORA DE COMBUSTIBLES</SelectItem>
                          <SelectItem value="GOBIERNO MUNICIPAL">GOBIERNO MUNICIPAL</SelectItem>
                          <SelectItem value="GOBIERNO PROVINCIAL">GOBIERNO PROVINCIAL</SelectItem>
                          <SelectItem value="GOBIERNO NACIONAL">GOBIERNO NACIONAL</SelectItem>
                          <SelectItem value="SINDICATO">SINDICATO</SelectItem>
                          <SelectItem value="AMOBLAMIENTOS DE OFICINA">AMOBLAMIENTOS DE OFICINA</SelectItem>
                          <SelectItem value="ASOCIACION CIVIL">ASOCIACION CIVIL</SelectItem>
                          <SelectItem value="SERVICIOS DE VIGILANCIA">SERVICIOS DE VIGILANCIA</SelectItem>
                          <SelectItem value="EMERGENCIAS MEDICAS">EMERGENCIAS MEDICAS</SelectItem>
                          <SelectItem value="DISTRIBUIDORA DE BEBIDAS">DISTRIBUIDORA DE BEBIDAS</SelectItem>
                          <SelectItem value="FAB/DISTRIB DE GAS/PETROLEO">FAB/DISTRIB DE GAS/PETROLEO</SelectItem>
                          <SelectItem value="SERVICIOS DE CARGA Y/O ESTIBA">SERVICIOS DE CARGA Y/O ESTIBA</SelectItem>
                          <SelectItem value="PROFESIONES LIBERALES">PROFESIONES LIBERALES</SelectItem>
                          <SelectItem value="VENTA DE REPUESTOS">VENTA DE REPUESTOS</SelectItem>
                          <SelectItem value="SERVICIO DE LIMPIEZA">SERVICIO DE LIMPIEZA</SelectItem>
                          <SelectItem value="VENTA DE ELECTRODOMESTICOS">VENTA DE ELECTRODOMESTICOS</SelectItem>
                          <SelectItem value="VENTA DE MUEBLES">VENTA DE MUEBLES</SelectItem>
                          <SelectItem value="VENTA DE ROPA">VENTA DE ROPA</SelectItem>
                          <SelectItem value="VENTA DE CALZADO">VENTA DE CALZADO</SelectItem>
                          <SelectItem value="VENTA DE JUGUETES">VENTA DE JUGUETES</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DEPORTIVOS">VENTA DE ARTICULOS DEPORTIVOS</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE COMPUTACION">
                            VENTA DE ARTICULOS DE COMPUTACION
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE OFICINA">VENTA DE ARTICULOS DE OFICINA</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE LIMPIEZA">VENTA DE ARTICULOS DE LIMPIEZA</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE PERFUMERIA">
                            VENTA DE ARTICULOS DE PERFUMERIA
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE BIJOUTERIE">
                            VENTA DE ARTICULOS DE BIJOUTERIE
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE MARROQUINERIA">
                            VENTA DE ARTICULOS DE MARROQUINERIA
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE COTILLON">VENTA DE ARTICULOS DE COTILLON</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE DECORACION">
                            VENTA DE ARTICULOS DE DECORACION
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE ILUMINACION">
                            VENTA DE ARTICULOS DE ILUMINACION
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE JARDINERIA">
                            VENTA DE ARTICULOS DE JARDINERIA
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE CAMPING">VENTA DE ARTICULOS DE CAMPING</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE PESCA">VENTA DE ARTICULOS DE PESCA</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE CAZA">VENTA DE ARTICULOS DE CAZA</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE FOTOGRAFIA">
                            VENTA DE ARTICULOS DE FOTOGRAFIA
                          </SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE MUSICA">VENTA DE ARTICULOS DE MUSICA</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE VIDEO">VENTA DE ARTICULOS DE VIDEO</SelectItem>
                          <SelectItem value="VENTA DE ARTICULOS DE AUDIO">VENTA DE ARTICULOS DE AUDIO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
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
                            <SelectItem value="Cons. Final Pers. No Física">Cons. Final Pers. No Física</SelectItem>
                            <SelectItem value="Adherido al Monotributo">Adherido al Monotributo</SelectItem>
                            <SelectItem value="Resp. no categorizado">Resp. no categorizado</SelectItem>
                            <SelectItem value="IVA no alcanzado">IVA no alcanzado</SelectItem>
                            <SelectItem value="Responsable Monotributo">Responsable Monotributo</SelectItem>
                            <SelectItem value="Monotributo Social">Monotributo Social</SelectItem>
                            <SelectItem value="Pequeño Contrib. Eventual">Pequeño Contrib. Eventual</SelectItem>
                            <SelectItem value="Pequeño Contrib. Eventual Social">
                              Pequeño Contrib. Eventual Social
                            </SelectItem>
                            <SelectItem value='RI Factura "M"'>RI Factura "M"</SelectItem>
                            <SelectItem value='RI Factura "A" C/CBU Informado'>
                              RI Factura "A" C/CBU Informado
                            </SelectItem>
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
            <Card>
              <CardHeader>
                <CardTitle>Solicitud de Póliza</CardTitle>
                <CardDescription>Complete los datos finales para emitir la póliza</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="medio_pago">Medio de Pago</Label>
                    <Select>
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

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dni_cliente">Cliente - DNI</Label>
                      <Input id="dni_cliente" placeholder="Número de DNI" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sexo_cliente">Cliente - Sexo</Label>
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

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="dominio">Vehículo - Dominio</Label>
                      <Input id="dominio" placeholder="ABC123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chasis">Vehículo - Chasis</Label>
                      <Input id="chasis" placeholder="Número de chasis" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motor">Vehículo - Número de Motor</Label>
                      <Input id="motor" placeholder="Número de motor" />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep("inspection")}>
                      Anterior
                    </Button>
                    <Button type="submit">Emitir Póliza</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
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
