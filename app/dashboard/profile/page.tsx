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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Lock, Building2, Save, Upload } from "lucide-react"
import Link from "next/link"

const companies = [
  {
    id: "rivadavia",
    name: "Rivadavia",
    logo: "https://www.segurosrivadavia.com/logo-seguros-rivadavia.webp",
    fields: ["matricula", "usuario", "contraseña"],
  },
  {
    id: "berkley",
    name: "Berkley",
    logo: "https://www.berkley.com.ar/img/Berkley-Argentina-Seguros2.png",
    fields: ["matricula", "usuario", "contraseña"],
  },
  {
    id: "allianz",
    name: "Allianz",
    logo: "https://www.allianz.com.ar/content/dam/onemarketing/system/allianz-logo.svg",
    fields: ["mail", "matricula", "aplicacion", "usuario", "contraseña"],
  },
  {
    id: "mercantil",
    name: "Mercantil Andina",
    logo: "https://www.mercantilandina.com.ar/wp-content/uploads/2023/08/Logo-1.svg",
    fields: ["matricula", "usuario", "contraseña"],
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState("/abstract-profile.png")
  const [personalData, setPersonalData] = useState({
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@primusbroker.com",
    phone: "+54 9 11 2345-6789",
    dni: "35123456",
    matricula: "12345",
    address: "Av. Corrientes 1234, Piso 5",
  })

  const [companyCredentials, setCompanyCredentials] = useState({
    rivadavia: { matricula: "", usuario: "", contraseña: "" },
    berkley: { matricula: "", usuario: "", contraseña: "" },
    allianz: { mail: "", matricula: "", aplicacion: "", usuario: "", contraseña: "" },
    mercantil: { matricula: "", usuario: "", contraseña: "" },
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSavePersonal = () => {
    console.log("[v0] Saving personal data:", personalData)
    alert("Datos personales guardados exitosamente")
    setIsEditing(false)
  }

  const handleSaveCompanyCredentials = (companyId: string) => {
    console.log(
      "[v0] Saving company credentials:",
      companyId,
      companyCredentials[companyId as keyof typeof companyCredentials],
    )
    alert("Credenciales guardadas exitosamente")
  }

  const handleCompanyFieldChange = (companyId: string, field: string, value: string) => {
    setCompanyCredentials({
      ...companyCredentials,
      [companyId]: {
        ...companyCredentials[companyId as keyof typeof companyCredentials],
        [field]: value,
      },
    })
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    console.log("[v0] Changing password")
    alert("Contraseña cambiada exitosamente")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
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
              <BreadcrumbPage>Perfil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">Administra tu información personal y credenciales de la empresa</p>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="size-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="size-4" />
              <span className="hidden sm:inline">Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="size-4" />
              <span className="hidden sm:inline">Comapñias</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información personal</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Perfil"
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                  />
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("profileImage")?.click()}
                      >
                        <Upload className="mr-2 size-4" />
                        Cambiar Foto
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      value={personalData.firstName}
                      onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      value={personalData.lastName}
                      onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalData.email}
                      onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={personalData.phone}
                      onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dni">DNI *</Label>
                    <Input
                      id="dni"
                      value={personalData.dni}
                      onChange={(e) => setPersonalData({ ...personalData, dni: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matrícula *</Label>
                    <Input
                      id="matricula"
                      value={personalData.matricula}
                      onChange={(e) => setPersonalData({ ...personalData, matricula: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Dirección *</Label>
                    <Input
                      id="address"
                      value={personalData.address}
                      onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSavePersonal() : setIsEditing(true))}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 size-4" />
                      Guardar
                    </>
                  ) : (
                    "Editar"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-4">
            {companies.map((company) => (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <img src={company.logo || "/placeholder.svg"} alt={company.name} className="h-8 object-contain" />
                        <CardDescription>Credenciales de acceso para {company.name}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                            companyCredentials[company.id as keyof typeof companyCredentials][
                            field as keyof (typeof companyCredentials)[keyof typeof companyCredentials]
                            ] as string
                          }
                          onChange={(e) => handleCompanyFieldChange(company.id, field, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={() => handleSaveCompanyCredentials(company.id)}>
              <Save className="mr-2 size-4" />
              Guardar
            </Button>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>Actualiza tu contraseña de acceso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contraseña Actual *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Ingresa tu contraseña actual"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva Contraseña *</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Ingresa tu nueva contraseña"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirma tu nueva contraseña"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Requisitos de contraseña:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Mínimo 8 caracteres</li>
                      <li>Al menos una letra mayúscula</li>
                      <li>Al menos una letra minúscula</li>
                      <li>Al menos un número</li>
                      <li>Al menos un carácter especial (!@#$%^&*)</li>
                    </ul>
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleChangePassword}>Cambiar Contraseña</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sesiones Activas</CardTitle>
                <CardDescription>Administra tus sesiones activas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Sesión Actual</p>
                      <p className="text-sm text-muted-foreground">Navegador: Chrome en Windows</p>
                      <p className="text-sm text-muted-foreground">IP: 192.168.1.100</p>
                    </div>
                    <Badge>Activa</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset >
  )
}
