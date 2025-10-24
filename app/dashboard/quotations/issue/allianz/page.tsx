"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, User, Home, Car, ClipboardCheck } from "lucide-react"
import Link from "next/link"

export default function AllianzIssuePage() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting Allianz policy request")
    router.push("/dashboard/policies")
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
            <div className="flex items-center gap-2">
              <img
                src="https://www.allianz.com.ar/content/dam/onemarketing/system/allianz-logo.svg"
                alt="Allianz"
                className="h-6 object-contain"
              />
              <h2 className="text-3xl font-bold tracking-tight">Emitir Póliza</h2>
            </div>
          </div>
          <p className="text-muted-foreground">Complete el formulario para emitir la póliza con Allianz</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Póliza
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha_desde">Fecha Desde</Label>
                <Input id="fecha_desde" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha_hasta">Fecha Hasta</Label>
                <Input id="fecha_hasta" type="date" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Asegurado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido y Nombre</Label>
                <Input id="apellido" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condicion_iva">Condición de IVA</Label>
                <Select required>
                  <SelectTrigger id="condicion_iva">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">CONSUMIDOR FINAL</SelectItem>
                    <SelectItem value="3">INSCRIPTO</SelectItem>
                    <SelectItem value="5">INSCRIPTO - ARYP</SelectItem>
                    <SelectItem value="2">EXENTO</SelectItem>
                    <SelectItem value="6">INSCRIPTO EXCEPTUADO</SelectItem>
                    <SelectItem value="9">MONOTRIBUTO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condicion_iibb">Condición IIBB</Label>
                <Select required>
                  <SelectTrigger id="condicion_iibb">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">REGIMEN SIMPLIFICADO</SelectItem>
                    <SelectItem value="1">C.LOCAL (PROD. Y ASEGUR.)</SelectItem>
                    <SelectItem value="2">NO INSCRIPTO (PRODUCTORES)</SelectItem>
                    <SelectItem value="3">EXENTO O EXCLUIDO (ASEGURADOS)</SelectItem>
                    <SelectItem value="4">CONV.MULTILATERAL (PROD Y ASE)</SelectItem>
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
                    <SelectItem value="M">MATRICULA</SelectItem>
                    <SelectItem value="D">DNI</SelectItem>
                    <SelectItem value="X">CUIL</SelectItem>
                    <SelectItem value="T">CUIT</SelectItem>
                    <SelectItem value="P">PASAPORTE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nro_documento">Número de Documento</Label>
                <Input id="nro_documento" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nacionalidad">Nacionalidad</Label>
                <Select required>
                  <SelectTrigger id="nacionalidad">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Argentino</SelectItem>
                    <SelectItem value="E">Extranjero</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
                <Input id="fecha_nacimiento" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado_civil">Estado Civil</Label>
                <Select required>
                  <SelectTrigger id="estado_civil">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">SOLTERO</SelectItem>
                    <SelectItem value="C">CASADO</SelectItem>
                    <SelectItem value="V">VIUDO</SelectItem>
                    <SelectItem value="D">DIVORCIADO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
            </div>
          </CardContent>
        </Card>

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
                <Label htmlFor="provincia">Provincia</Label>
                <Input id="provincia" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad</Label>
                <Input id="ciudad" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calle">Calle</Label>
                <Input id="calle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input id="numero" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo_postal">Código Postal</Label>
                <Input id="codigo_postal" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehículo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patente">Patente</Label>
                <Input id="patente" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nro_motor">Número de Motor</Label>
                <Input id="nro_motor" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nro_chasis">Número de Chasis</Label>
                <Input id="nro_chasis" required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Inspección
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insp_fecha_desde">Fecha Desde</Label>
                <Input id="insp_fecha_desde" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_fecha_hasta">Fecha Hasta</Label>
                <Input id="insp_fecha_hasta" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_telefono">Teléfono</Label>
                <Input id="insp_telefono" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_provincia">Provincia</Label>
                <Input id="insp_provincia" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_ciudad">Ciudad</Label>
                <Input id="insp_ciudad" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_calle">Calle</Label>
                <Input id="insp_calle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_numero">Número</Label>
                <Input id="insp_numero" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_piso">Piso</Label>
                <Input id="insp_piso" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_departamento">Departamento</Label>
                <Input id="insp_departamento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insp_codigo_postal">Código Postal</Label>
                <Input id="insp_codigo_postal" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Textarea id="observaciones" rows={3} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit">Emitir Póliza</Button>
        </div>
      </form>
    </div>
  )
}
