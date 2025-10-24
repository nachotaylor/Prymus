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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

const vehicleBrands = [
  { id: "chevrolet", name: "Chevrolet", logo: "/chevrolet-bow-tie-logo.png" },
  { id: "ford", name: "Ford", logo: "/ford-logo-generic.png" },
  { id: "peugeot", name: "Peugeot", logo: "/peugeot-logo.jpg" },
  { id: "volkswagen", name: "Volkswagen", logo: "/volkswagen-logo.png" },
  { id: "toyota", name: "Toyota", logo: "/toyota-logo.png" },
  { id: "renault", name: "Renault", logo: "/renault-logo.jpg" },
  { id: "fiat", name: "Fiat", logo: "/fiat-logo.png" },
  { id: "nissan", name: "Nissan", logo: "/nissan-logo.png" },
]

const vehicleModels: Record<string, string[]> = {
  chevrolet: ["Cruze", "Onix", "Tracker", "S10", "Spin"],
  ford: ["Ranger", "Focus", "Fiesta", "EcoSport", "Territory"],
  peugeot: ["208", "2008", "3008", "Partner", "Expert"],
  volkswagen: ["Gol", "Polo", "Virtus", "T-Cross", "Amarok"],
  toyota: ["Corolla", "Hilux", "Etios", "SW4", "Yaris"],
  renault: ["Sandero", "Logan", "Duster", "Kangoo", "Alaskan"],
  fiat: ["Cronos", "Argo", "Pulse", "Toro", "Strada"],
  nissan: ["Versa", "Kicks", "Frontier", "X-Trail", "Sentra"],
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

export default function NewQuotationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [formData, setFormData] = useState({
    ivaCondition: "",
    alarm: "",
    usageType: "",
    postalCode: "",
  })

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    console.log("[v0] Submitting quotation:", {
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      ...formData,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard/quotations")
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedBrand !== ""
      case 2:
        return selectedModel !== ""
      case 3:
        return selectedYear !== ""
      case 4:
        return (
          formData.ivaCondition !== "" &&
          formData.alarm !== "" &&
          formData.usageType !== "" &&
          formData.postalCode !== ""
        )
      default:
        return false
    }
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
              <BreadcrumbPage>Nueva Cotización</BreadcrumbPage>
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
            <h1 className="text-3xl font-bold tracking-tight">Nueva Cotización</h1>
            <p className="text-muted-foreground">Paso {currentStep} de 4</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex size-8 items-center justify-center rounded-full border-2 ${
                  step < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : step === currentStep
                      ? "border-primary text-primary"
                      : "border-muted text-muted-foreground"
                }`}
              >
                {step < currentStep ? <Check className="size-4" /> : step}
              </div>
              {step < 4 && <div className={`h-0.5 flex-1 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Selecciona la Marca del Vehículo"}
              {currentStep === 2 && "Selecciona el Modelo"}
              {currentStep === 3 && "Selecciona el Año"}
              {currentStep === 4 && "Completa los Datos"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Elige la marca del vehículo a cotizar"}
              {currentStep === 2 && `Elige el modelo de ${vehicleBrands.find((b) => b.id === selectedBrand)?.name}`}
              {currentStep === 3 && "Selecciona el año del vehículo"}
              {currentStep === 4 && "Completa la información adicional para la cotización"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vehicleBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id)}
                    className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 p-6 transition-all hover:border-primary ${
                      selectedBrand === brand.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="size-16 object-contain" />
                    <span className="font-medium">{brand.name}</span>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
                <div className="grid gap-3">
                  {vehicleModels[selectedBrand]?.map((model) => (
                    <div
                      key={model}
                      className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${
                        selectedModel === model ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <RadioGroupItem value={model} id={model} />
                      <Label htmlFor={model} className="flex-1 cursor-pointer font-medium">
                        {vehicleBrands.find((b) => b.id === selectedBrand)?.name} {model}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el año" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedYear && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <p className="text-sm font-medium">Vehículo seleccionado:</p>
                    <p className="text-lg font-bold text-primary">
                      {vehicleBrands.find((b) => b.id === selectedBrand)?.name} {selectedModel} {selectedYear}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="iva-condition">Condición IVA *</Label>
                  <Select
                    value={formData.ivaCondition}
                    onValueChange={(value) => setFormData({ ...formData, ivaCondition: value })}
                  >
                    <SelectTrigger id="iva-condition">
                      <SelectValue placeholder="Selecciona la condición IVA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consumidor-final">Consumidor Final</SelectItem>
                      <SelectItem value="monotributista">Monotributista</SelectItem>
                      <SelectItem value="responsable-inscripto">Responsable Inscripto</SelectItem>
                      <SelectItem value="exento">Exento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Alarma *</Label>
                  <RadioGroup
                    value={formData.alarm}
                    onValueChange={(value) => setFormData({ ...formData, alarm: value })}
                  >
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id="alarm-si" />
                        <Label htmlFor="alarm-si" className="cursor-pointer">
                          Sí
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="alarm-no" />
                        <Label htmlFor="alarm-no" className="cursor-pointer">
                          No
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Uso *</Label>
                  <RadioGroup
                    value={formData.usageType}
                    onValueChange={(value) => setFormData({ ...formData, usageType: value })}
                  >
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="particular" id="usage-particular" />
                        <Label htmlFor="usage-particular" className="cursor-pointer">
                          Particular
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comercial" id="usage-comercial" />
                        <Label htmlFor="usage-comercial" className="cursor-pointer">
                          Comercial
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal-code">Código Postal *</Label>
                  <Input
                    id="postal-code"
                    placeholder="Ej: 1425"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm font-medium mb-2">Resumen:</p>
                  <p className="text-sm">
                    <span className="font-semibold">Vehículo:</span>{" "}
                    {vehicleBrands.find((b) => b.id === selectedBrand)?.name} {selectedModel} {selectedYear}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 size-4" />
            Anterior
          </Button>
          {currentStep < 4 ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Siguiente
              <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed()}>
              <Check className="mr-2 size-4" />
              Crear Cotización
            </Button>
          )}
        </div>
      </div>
    </SidebarInset>
  )
}
