"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

export default function BerkleyIssuePage() {
  const router = useRouter()
  const [formaPago, setFormaPago] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to backend API
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
            <h2 className="text-3xl font-bold tracking-tight">Emitir Póliza - Berkley</h2>
          </div>
          <p className="text-muted-foreground">Complete el formulario para emitir la póliza con Berkley</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Solicitud de Póliza
            </CardTitle>
            <CardDescription>Ingrese los datos del asegurado y del vehículo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Datos del Asegurado */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Datos del Asegurado</h3>
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
            </div>

            {/* Domicilio */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Domicilio</h3>
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
            </div>

            {/* Datos del Vehículo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Datos del Vehículo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            {/* Forma de Pago */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Forma de Pago</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                {(formaPago === "3" || formaPago === "4") && (
                  <>
                    {formaPago === "3" && (
                      <div className="space-y-2">
                        <Label htmlFor="tipo_tarjeta">Tipo de Tarjeta</Label>
                        <Select required>
                          <SelectTrigger id="tipo_tarjeta">
                            <SelectValue placeholder="Seleccione tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AME">AMERICAN EXPRESS</SelectItem>
                            <SelectItem value="ANES">ASOCIACION DE ANESTESIOLOGIA</SelectItem>
                            <SelectItem value="ARG">ARGENCARD</SelectItem>
                            <SelectItem value="BIA">BERKLEY INTERNATIONAL ARG</SelectItem>
                            <SelectItem value="BIS">BISEL</SelectItem>
                            <SelectItem value="BRT">BERKLEY INT. A.R.T.</SelectItem>
                            <SelectItem value="CAB">CABAL</SelectItem>
                            <SelectItem value="CER">CERVANTES GAS</SelectItem>
                            <SelectItem value="CFA">CIRCULO FUERZA AEREA</SelectItem>
                            <SelectItem value="CIAPG">PAGOS COMPAÑIA ( BERKLEY -BIS-)</SelectItem>
                            <SelectItem value="CMR">C.M.R.</SelectItem>
                            <SelectItem value="CN">CENTRO NAVAL</SelectItem>
                            <SelectItem value="CON">CONTAR S.A.</SelectItem>
                            <SelectItem value="COR">CORDOBESA</SelectItem>
                            <SelectItem value="CRE">CARTA CREDENCIAL</SelectItem>
                            <SelectItem value="DIB">DIBA BUENOS AIRES Y BNPB</SelectItem>
                            <SelectItem value="DIN">DINNERS</SelectItem>
                            <SelectItem value="ELB">ELEBAR</SelectItem>
                            <SelectItem value="FED">FEDIL</SelectItem>
                            <SelectItem value="FRA">CARTA FRANCA</SelectItem>
                            <SelectItem value="LEAL">TARJETA LEAL</SelectItem>
                            <SelectItem value="MAC">SEGUROS BANCO MACRO</SelectItem>
                            <SelectItem value="MAS">MASTERCARD</SelectItem>
                            <SelectItem value="MCA">MUTUAL CLUB ATL ARGENTINO</SelectItem>
                            <SelectItem value="MCE">TARJETA CENTRAL (MUTUAL CENTRAL)</SelectItem>
                            <SelectItem value="NAC">NACION INTELIGENTE (MZA)</SelectItem>
                            <SelectItem value="NAR">TARJETA NARANJA</SelectItem>
                            <SelectItem value="NEV">TARJETA NEVADA</SelectItem>
                            <SelectItem value="PAT">PATAGONIA 365</SelectItem>
                            <SelectItem value="PLA">PLATINO</SelectItem>
                            <SelectItem value="PLA1">PLAN PLATINO</SelectItem>
                            <SelectItem value="SMS">SMSV</SelectItem>
                            <SelectItem value="VIS">VISA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="numero_tarjeta_cbu">{formaPago === "3" ? "Número de Tarjeta" : "CBU"}</Label>
                      <Input id="numero_tarjeta_cbu" required />
                    </div>
                    {formaPago === "3" && (
                      <div className="space-y-2">
                        <Label htmlFor="fecha_vencimiento">Fecha Vencimiento Tarjeta</Label>
                        <Input id="fecha_vencimiento" type="month" required />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Datos Prendarios (Opcionales) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Datos Prendarios (Opcional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prendario">Prendario</Label>
                  <Select>
                    <SelectTrigger id="prendario">
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S">Si</SelectItem>
                      <SelectItem value="N">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cod_acreedor">Código de Acreedor Prendario</Label>
                  <Input id="cod_acreedor" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fecha_prestamo">Fecha de Préstamo</Label>
                  <Input id="fecha_prestamo" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nro_prestamo">Número de Préstamo</Label>
                  <Input id="nro_prestamo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solicitud_banco">Solicitud del Banco</Label>
                  <Input id="solicitud_banco" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit">Emitir Póliza</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
