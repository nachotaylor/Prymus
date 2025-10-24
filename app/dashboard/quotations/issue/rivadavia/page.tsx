"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, FileText, User, Home, Car } from "lucide-react"
import Link from "next/link"

export default function RivadaviaIssuePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [medioPago, setMedioPago] = useState("")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages].slice(0, 8))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      // TODO: Connect to backend API
      console.log("[v0] Submitting Rivadavia policy request")
      router.push("/dashboard/policies")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/quotations">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Emitir Póliza - Rivadavia</h2>
          </div>
          <p className="text-muted-foreground">
            Paso {currentStep} de 2: {currentStep === 1 ? "Solicitud de Inspección" : "Solicitud de Póliza"}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        <div className={`flex-1 h-2 rounded-full ${currentStep >= 1 ? "bg-primary" : "bg-muted"}`} />
        <div className={`flex-1 h-2 rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`} />
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Solicitud de Inspección
              </CardTitle>
              <CardDescription>
                Suba las imágenes del vehículo (hasta 8 para usados) o el certificado de no rodamiento (0 KM)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quotation_id">Número de Cotización</Label>
                <Input id="quotation_id" placeholder="Ej: COT-2024-001" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Imágenes del Vehículo</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Puede subir hasta 8 imágenes para vehículos usados o el certificado para 0 KM
                </p>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Imagen ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit">Continuar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Datos del Asegurado */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos del Asegurado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apellido_nombre">Apellido y Nombre</Label>
                    <Input id="apellido_nombre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo_asegurado">Tipo Asegurado</Label>
                    <Select required>
                      <SelectTrigger id="tipo_asegurado">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Persona Fisica</SelectItem>
                        <SelectItem value="2">Varias Personas Fisicas</SelectItem>
                        <SelectItem value="3">Empresa/Industria</SelectItem>
                        <SelectItem value="4">Persona Juridica</SelectItem>
                        <SelectItem value="5">Organismo Publico</SelectItem>
                        <SelectItem value="6">Empresa de Transporte</SelectItem>
                        <SelectItem value="8">Consorcio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo_documento">Tipo de Documento</Label>
                    <Select required>
                      <SelectTrigger id="tipo_documento">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">Libreta Enrolamiento</SelectItem>
                        <SelectItem value="3">Libreta Civica</SelectItem>
                        <SelectItem value="4">DNI</SelectItem>
                        <SelectItem value="5">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nro_documento">Número de Documento</Label>
                    <Input id="nro_documento" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuil">CUIL</Label>
                    <Input id="cuil" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuit">CUIT</Label>
                    <Input id="cuit" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sexo">Sexo</Label>
                    <Select required>
                      <SelectTrigger id="sexo">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="F">Femenino</SelectItem>
                        <SelectItem value="M">Masculino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado_civil">Estado Civil</Label>
                    <Select required>
                      <SelectTrigger id="estado_civil">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="S">Soltero</SelectItem>
                        <SelectItem value="C">Casado</SelectItem>
                        <SelectItem value="V">Viudo</SelectItem>
                        <SelectItem value="D">Divorciado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="politico">Político</Label>
                    <Select required>
                      <SelectTrigger id="politico">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="N">No</SelectItem>
                        <SelectItem value="S">Si</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fec_nacimiento">Fecha de Nacimiento</Label>
                    <Input id="fec_nacimiento" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lugar_nacimiento">Lugar de Nacimiento</Label>
                    <Input id="lugar_nacimiento" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nacionalidad">Nacionalidad</Label>
                    <Input id="nacionalidad" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Domicilio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Domicilio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calle">Calle</Label>
                    <Input id="calle" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nro_puerta">Número</Label>
                    <Input id="nro_puerta" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="piso">Piso (Opcional)</Label>
                    <Input id="piso" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="depto">Departamento (Opcional)</Label>
                    <Input id="depto" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localidad">Localidad</Label>
                    <Input id="localidad" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cod_provincia">Provincia</Label>
                    <Input id="cod_provincia" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cod_postal">Código Postal</Label>
                    <Input id="cod_postal" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cod_area_telefono">Código de Área</Label>
                    <Input id="cod_area_telefono" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nro_telefono">Número de Teléfono</Label>
                    <Input id="nro_telefono" type="tel" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mail">Email</Label>
                    <Input id="mail" type="email" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Condiciones Fiscales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Condiciones Fiscales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="condicion_iva">Condición de IVA</Label>
                    <Select required>
                      <SelectTrigger id="condicion_iva">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Consumidor Final</SelectItem>
                        <SelectItem value="2">Responsable inscripto</SelectItem>
                        <SelectItem value="4">Exento</SelectItem>
                        <SelectItem value="5">Responsable inscripto y Agente de percepcion</SelectItem>
                        <SelectItem value="6">Monotributista</SelectItem>
                        <SelectItem value="7">No categorizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condicion_ib">Condición Ingresos Brutos</Label>
                    <Select required>
                      <SelectTrigger id="condicion_ib">
                        <SelectValue placeholder="Seleccione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Consumidor Final</SelectItem>
                        <SelectItem value="2">Convenio Local</SelectItem>
                        <SelectItem value="3">Convenio Multilateral</SelectItem>
                        <SelectItem value="4">Exento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nro_insc_ib">Inscripción IIBB</Label>
                    <Input id="nro_insc_ib" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medio de Pago */}
            <Card>
              <CardHeader>
                <CardTitle>Medio de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Seleccione el medio de pago</Label>
                  <Select onValueChange={setMedioPago} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione medio de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tarjeta">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="cbu">CBU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {medioPago === "tarjeta" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tarjeta_credito">Número de Tarjeta</Label>
                      <Input id="tarjeta_credito" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cod_tarjeta_credito">Código de Tarjeta</Label>
                      <Select required>
                        <SelectTrigger id="cod_tarjeta_credito">
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">ARGENCARD/MASTERCARD</SelectItem>
                          <SelectItem value="2">VISA</SelectItem>
                          <SelectItem value="3">DINERS</SelectItem>
                          <SelectItem value="4">CABAL</SelectItem>
                          <SelectItem value="6">CARTA AUSTRAL</SelectItem>
                          <SelectItem value="7">FAVACARD</SelectItem>
                          <SelectItem value="10">AMERICAN EXPRESS</SelectItem>
                          <SelectItem value="12">AUTOMATICA</SelectItem>
                          <SelectItem value="14">NARANJA</SelectItem>
                          <SelectItem value="15">SUCREDITO</SelectItem>
                          <SelectItem value="16">NATIVA</SelectItem>
                          <SelectItem value="17">COOPEPLUS</SelectItem>
                          <SelectItem value="18">DATA 2000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {medioPago === "cbu" && (
                  <div className="space-y-2">
                    <Label htmlFor="cbu">CBU</Label>
                    <Input id="cbu" required />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vigencia y Cobertura */}
            <Card>
              <CardHeader>
                <CardTitle>Vigencia y Cobertura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vig_desde">Vigencia Desde</Label>
                    <Input id="vig_desde" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vig_hasta">Vigencia Hasta</Label>
                    <Input id="vig_hasta" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cobertura">Cobertura</Label>
                    <Input id="cobertura" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información del Vehículo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Información del Vehículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="motor">Número de Motor</Label>
                    <Input id="motor" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chasis">Número de Chasis</Label>
                    <Input id="chasis" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patente">Patente</Label>
                    <Input id="patente" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carroceria">Tipo de Carrocería</Label>
                    <Select required>
                      <SelectTrigger id="carroceria">
                        <SelectValue placeholder="Seleccione tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sedan</SelectItem>
                        <SelectItem value="2">Convertible</SelectItem>
                        <SelectItem value="3">Coupe</SelectItem>
                        <SelectItem value="4">Casa Rodante</SelectItem>
                        <SelectItem value="5">Auxilio Mecanico</SelectItem>
                        <SelectItem value="6">Break o 5 Puertas</SelectItem>
                        <SelectItem value="7">Microcoupe</SelectItem>
                        <SelectItem value="8">Playo</SelectItem>
                        <SelectItem value="9">Caja Metalica</SelectItem>
                        <SelectItem value="10">Caja de Madera</SelectItem>
                        <SelectItem value="11">Volcador</SelectItem>
                        <SelectItem value="12">Frigorifico</SelectItem>
                        <SelectItem value="13">Furgon</SelectItem>
                        <SelectItem value="14">Tanque</SelectItem>
                        <SelectItem value="15">Jaula</SelectItem>
                        <SelectItem value="16">Omnibus</SelectItem>
                        <SelectItem value="17">Microomnibus</SelectItem>
                        <SelectItem value="18">Colectivo</SelectItem>
                        <SelectItem value="19">Minibus</SelectItem>
                        <SelectItem value="20">Doble Cabina</SelectItem>
                        <SelectItem value="21">Termico</SelectItem>
                        <SelectItem value="22">Triciclo</SelectItem>
                        <SelectItem value="23">Cuatriciclo</SelectItem>
                        <SelectItem value="24">Tolva</SelectItem>
                        <SelectItem value="25">Porta Contenedores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="informe_estado">Informe de Estado</Label>
                    <Input id="informe_estado" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="informe_km">Kilometraje</Label>
                    <Input id="informe_km" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="informe_cubiertas">Estado de Cubiertas</Label>
                    <Input id="informe_cubiertas" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="informe_color">Color</Label>
                    <Input id="informe_color" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                Volver
              </Button>
              <Button type="submit">Emitir Póliza</Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
