"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

export default function BerkleyIssuePage() {
  const router = useRouter()
  const [formaPago, setFormaPago] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting Berkley policy request")
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
                src="https://www.berkley.com.ar/img/Berkley-Argentina-Seguros2.png"
                alt="Berkley"
                className="h-6 object-contain"
              />
              <h2 className="text-3xl font-bold tracking-tight">Emitir Póliza</h2>
            </div>
          </div>
          <p className="text-muted-foreground">Complete el formulario para emitir la póliza con Berkley</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Asegurado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Asegurado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido o Razón Social</Label>
                <Input id="apellido" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo_documento">Tipo de Documento</Label>
                <Select required>
                  <SelectTrigger id="tipo_documento">
                    <SelectValue placeholder="Seleccione tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="80">CUIT</SelectItem>
                    <SelectItem value="86">CUIL</SelectItem>
                    <SelectItem value="89">LE</SelectItem>
                    <SelectItem value="90">LC</SelectItem>
                    <SelectItem value="94">PASAPORTE</SelectItem>
                    <SelectItem value="96">DNI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nro_documento">Número de Documento</Label>
                <Input id="nro_documento" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo_persona">Tipo de Persona</Label>
                <Select required>
                  <SelectTrigger id="tipo_persona">
                    <SelectValue placeholder="Seleccione tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="F">FISICA</SelectItem>
                    <SelectItem value="J">JURIDICA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condicion_iva">Condición de IVA</Label>
                <Select required>
                  <SelectTrigger id="condicion_iva">
                    <SelectValue placeholder="Seleccione condición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">IVA RESPONSABLE INSCRIPTO</SelectItem>
                    <SelectItem value="03">IVA NO RESPONSABLE</SelectItem>
                    <SelectItem value="04">IVA SUJETO EXENTO</SelectItem>
                    <SelectItem value="05">CONSUMIDOR FINAL</SelectItem>
                    <SelectItem value="13">MONOTRIBUTISTA SOCIAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input id="telefono" type="tel" required />
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
              <Label htmlFor="forma_pago">Forma de Pago</Label>
              <Select required onValueChange={setFormaPago}>
                <SelectTrigger id="forma_pago">
                  <SelectValue placeholder="Seleccione forma de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">COBRANZA MANUAL</SelectItem>
                  <SelectItem value="3">TARJETA DE CREDITO</SelectItem>
                  <SelectItem value="4">DEBITO CBU</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formaPago === "3" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo_tarjeta">Tipo de Tarjeta</Label>
                  <Select required>
                    <SelectTrigger id="tipo_tarjeta">
                      <SelectValue placeholder="Seleccione tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AME">AMERICAN EXPRESS</SelectItem>
                      <SelectItem value="MAS">MASTERCARD</SelectItem>
                      <SelectItem value="VIS">VISA</SelectItem>
                      <SelectItem value="DIN">DINNERS</SelectItem>
                      <SelectItem value="CAB">CABAL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero_tarjeta">Número de Tarjeta</Label>
                  <Input id="numero_tarjeta" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha_vencimiento">Fecha Vencimiento Tarjeta</Label>
                  <Input id="fecha_vencimiento" type="month" required />
                </div>
              </div>
            )}

            {formaPago === "4" && (
              <div className="space-y-2">
                <Label htmlFor="cbu">CBU</Label>
                <Input id="cbu" required />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Domicilio */}
        <Card>
          <CardHeader>
            <CardTitle>Domicilio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calle">Calle</Label>
                <Input id="calle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero_calle">Número de Calle</Label>
                <Input id="numero_calle" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="piso">Piso (Opcional)</Label>
                <Input id="piso" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento (Opcional)</Label>
                <Input id="departamento" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Póliza */}
        <Card>
          <CardHeader>
            <CardTitle>Póliza</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fecha_vigencia">Fecha de Vigencia</Label>
                <Input id="fecha_vigencia" type="date" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehículo */}
        <Card>
          <CardHeader>
            <CardTitle>Vehículo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit">Emitir Póliza</Button>
        </div>
      </form>
    </div>
  )
}
