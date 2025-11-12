"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const companies = [
  {
    id: "rivadavia",
    name: "Rivadavia",
    fields: ["matricula", "usuario", "contraseña"],
  },
  {
    id: "berkley",
    name: "Berkley",
    fields: ["matricula", "usuario", "contraseña"],
  },
  {
    id: "allianz",
    name: "Allianz",
    fields: ["mail", "matricula", "aplicacion", "usuario", "contraseña"],
  },
  {
    id: "mercantil",
    name: "Mercantil",
    fields: ["matricula", "usuario", "contraseña"],
  },
]

export default function NewProducerPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    status: "active",
    companies: {
      rivadavia: { matricula: "", usuario: "", contraseña: "" },
      berkley: { matricula: "", usuario: "", contraseña: "" },
      allianz: { mail: "", matricula: "", aplicacion: "", usuario: "", contraseña: "" },
      mercantil: { matricula: "", usuario: "", contraseña: "" },
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating new producer:", formData)
    alert("Productor creado exitosamente")
    router.push("/dashboard/management/producers")
  }

  const handleCompanyFieldChange = (companyId: string, field: string, value: string) => {
    setFormData({
      ...formData,
      companies: {
        ...formData.companies,
        [companyId]: {
          ...formData.companies[companyId as keyof typeof formData.companies],
          [field]: value,
        },
      },
    })
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
                <Link href="/dashboard/management">Gestión</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/management/producers">Productores</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nuevo Productor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/management/producers">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nuevo Productor</h1>
            <p className="text-muted-foreground">Registra un nuevo productor de seguros</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos básicos del productor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    placeholder="Ingrese el nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Apellido *</Label>
                  <Input
                    id="surname"
                    placeholder="Ingrese el apellido"
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ingrese el email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Ingrese el teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Estado *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Seleccione el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compañías de Seguros</CardTitle>
              <CardDescription>Configura las credenciales para cada compañía</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="rivadavia" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {companies.map((company) => (
                    <TabsTrigger key={company.id} value={company.id} className="flex items-center gap-2">
                      <span className="hidden sm:inline">{company.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {companies.map((company) => (
                  <TabsContent key={company.id} value={company.id} className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {company.fields.map((field) => (
                        <div key={field} className="space-y-2">
                          <Label htmlFor={`${company.id}-${field}`}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </Label>
                          <Input
                            id={`${company.id}-${field}`}
                            type={field === "contraseña" ? "password" : "text"}
                            placeholder={`Ingrese ${field}`}
                            value={
                              formData.companies[company.id as keyof typeof formData.companies][
                              field as keyof (typeof formData.companies)[keyof typeof formData.companies]
                              ] as string
                            }
                            onChange={(e) => handleCompanyFieldChange(company.id, field, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/management/producers">Cancelar</Link>
            </Button>
            <Button type="submit">Crear Productor</Button>
          </div>
        </form>
      </div>
    </SidebarInset>
  )
}
