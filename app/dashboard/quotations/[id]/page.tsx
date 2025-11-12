"use client"
import { useState, useMemo, use } from "react"
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
import { ArrowLeft, ArrowRight, Check, Search, FileDown } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .catch((error) => ({ error }));



const vehicleBrands = [
  { id: "chevrolet", name: "Chevrolet", logo: "/chevrolet-logo.png" },
  { id: "ford", name: "Ford", logo: "/ford-oval-logo.png" },
  { id: "peugeot", name: "Peugeot", logo: "/peugeot-logo.png" },
  { id: "volkswagen", name: "Volkswagen", logo: "/volkswagen-logo.jpg" },
  { id: "toyota", name: "Toyota", logo: "/toyota-logo.png" },
  { id: "renault", name: "Renault", logo: "/renault-logo.png" },
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

const vehicleVersions: Record<string, string[]> = {
  "Chevrolet-Cruze": ["Cruze LT", "Cruze LTZ", "Cruze RS", "Cruze Premier"],
  "Chevrolet-Onix": ["Onix LT", "Onix LTZ", "Onix RS", "Onix Premier"],
  "Ford-Ranger": ["Ranger XL", "Ranger XLT", "Ranger Limited", "Ranger Wildtrak"],
  "Ford-Focus": ["Focus S", "Focus SE", "Focus Titanium", "Focus ST"],
  "Peugeot-208": ["208 Active", "208 Allure", "208 GT", "208 GT Sport"],
  "Volkswagen-Gol": ["Gol Trend", "Gol Comfortline", "Gol Highline", "Gol GTS"],
  "Toyota-Corolla": ["Corolla XEi", "Corolla SEi", "Corolla GLi", "Corolla GLi-S"],
  "Renault-Sandero": ["Sandero Expression", "Sandero Dynamique", "Sandero Privilege", "Sandero RS"],
  "Fiat-Cronos": ["Cronos Drive", "Cronos Precision", "Cronos Precision Plus", "Cronos Precision Turbo"],
  "Nissan-Versa": ["Versa Sense", "Versa Advance", "Versa Exclusive", "Versa Platinum"],
}

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

const quotationResults = [
  {
    id: "mercantil-1",
    company: "Mercantil Andina",
    logo: "https://www.mercantilandina.com.ar/wp-content/uploads/2023/08/Logo-1.svg",
    price: 45000,
    pricePerMonth: 3750,
    coverage: "B3",
  },
  {
    id: "mercantil-2",
    company: "Mercantil Andina",
    logo: "https://www.mercantilandina.com.ar/wp-content/uploads/2023/08/Logo-1.svg",
    price: 48000,
    pricePerMonth: 4000,
    coverage: "D2 0020",
  },
  {
    id: "berkley-1",
    company: "Berkley",
    logo: "https://www.berkley.com.ar/img/Berkley-Argentina-Seguros2.png",
    price: 42000,
    pricePerMonth: 3500,
    coverage: "C-EXC2",
  },
  {
    id: "berkley-2",
    company: "Berkley",
    logo: "https://www.berkley.com.ar/img/Berkley-Argentina-Seguros2.png",
    price: 44000,
    pricePerMonth: 3667,
    coverage: "T4-TRN04",
  },
  {
    id: "allianz-1",
    company: "Allianz",
    logo: "https://www.allianz.com.ar/content/dam/onemarketing/system/allianz-logo.svg",
    price: 48000,
    pricePerMonth: 4000,
    coverage: "C4",
  },
  {
    id: "allianz-2",
    company: "Allianz",
    logo: "https://www.allianz.com.ar/content/dam/onemarketing/system/allianz-logo.svg",
    price: 52000,
    pricePerMonth: 4333,
    coverage: "D4",
  },
  {
    id: "rivadavia-1",
    company: "Rivadavia",
    logo: "https://www.segurosrivadavia.com/logo-seguros-rivadavia.webp",
    price: 40000,
    pricePerMonth: 3333,
    coverage: "A",
  },
  {
    id: "rivadavia-2",
    company: "Rivadavia",
    logo: "https://www.segurosrivadavia.com/logo-seguros-rivadavia.webp",
    price: 45000,
    pricePerMonth: 3750,
    coverage: "F",
  },
  {
    id: "rivadavia-3",
    company: "Rivadavia",
    logo: "https://www.segurosrivadavia.com/logo-seguros-rivadavia.webp",
    price: 50000,
    pricePerMonth: 4167,
    coverage: "MX",
  },
  {
    id: "rivadavia-4",
    company: "Rivadavia",
    logo: "https://www.segurosrivadavia.com/logo-seguros-rivadavia.webp",
    price: 100000,
    pricePerMonth: 8333,
    coverage: "D F3",
  },
]

export default function NewQuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading, error } = useSWR(`/quotation/${id}`, fetcher)
  const router = useRouter()
  const queryParams = new URLSearchParams(window.location.search);
  const [currentStep, setCurrentStep] = useState(queryParams.get("step") ? parseInt(queryParams.get("step") as string, 10) : 1)
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedVersion, setSelectedVersion] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [brandSearch, setBrandSearch] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState<(typeof quotationResults)[0] | null>(null)
  const [formData, setFormData] = useState({
    ivaCondition: "",
    alarm: "",
    usageType: "",
    postalCode: "",
  })

  const filteredBrands = useMemo(() => {
    return vehicleBrands.filter((brand) => brand.name.toLowerCase().includes(brandSearch.toLowerCase()))
  }, [brandSearch])

  const availableVersions = useMemo(() => {
    if (!selectedBrand || !selectedModel) return []
    const key = `${vehicleBrands.find((b) => b.id === selectedBrand)?.name}-${selectedModel}`
    return vehicleVersions[key] || []
  }, [selectedBrand, selectedModel])

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  /*
  const handleSubmit = async () => {
    console.log("[v0] Submitting quotation:", {
      brand: selectedBrand,
      model: selectedModel,
      version: selectedVersion,
      year: selectedYear,
      ...formData,
    })

    setShowResults(true)
  }
  */

  /*
  const handleSaveQuotation = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard/quotations")
  }
  */

  const handleBackFromResults = () => {
    router.push("/dashboard/quotations")
  }

  /*
  const handleDetailView = (quotation: (typeof quotationResults)[0]) => {
    setSelectedQuotation(quotation)
  }
  */

  const handleBackFromDetail = () => {
    setSelectedQuotation(null)
  }

  const handleGeneratePDF = () => {
    console.log("[v0] Generating PDF for quotation")
    // PDF generation logic would go here
  }

  const getCompanyRoute = (company: string) => {
    const companyMap: Record<string, string> = {
      "Mercantil Andina": "/dashboard/quotations/issue/mercantil",
      Berkley: "/dashboard/quotations/issue/berkley",
      Allianz: "/dashboard/quotations/issue/allianz",
      Rivadavia: "/dashboard/quotations/issue/rivadavia",
    }
    return companyMap[company] || "/dashboard/quotations/issue/mercantil"
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedBrand !== ""
      case 2:
        return selectedModel !== ""
      case 3:
        return selectedVersion !== ""
      case 4:
        return selectedYear !== ""
      case 5:
        return (
          formData.ivaCondition !== "" &&
          formData.postalCode !== "" &&
          formData.alarm !== "" &&
          formData.usageType !== ""
        )
      default:
        return false
    }
  }

  //if (showResults) {
  if (selectedQuotation) {
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
                <BreadcrumbLink asChild>
                  <button onClick={handleBackFromDetail} className="text-blue-600 hover:underline">
                    Resultados de Cotización
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Detalle - {selectedQuotation.company}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{selectedQuotation.company}</h1>
              <p className="text-muted-foreground mt-2">Detalle de Cotización - {selectedQuotation.coverage}</p>
            </div>
            <Button variant="outline" onClick={handleBackFromDetail}>
              <ArrowLeft className="mr-2 size-4" />
              Volver
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedQuotation.logo || "/placeholder.svg"}
                    alt={selectedQuotation.company}
                    className="h-20 w-auto object-contain"
                  />
                  <div>
                    <CardTitle>{selectedQuotation.company}</CardTitle>
                    <CardDescription className="mt-1">{selectedQuotation.coverage}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Prima Anual</p>
                  <p className="text-3xl font-bold text-primary">
                    ${selectedQuotation.price.toLocaleString("es-AR")}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Prima Mensual</p>
                  <p className="text-3xl font-bold text-primary">
                    ${selectedQuotation.pricePerMonth.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Cobertura</h3>
                <p className="text-lg text-primary font-medium">{selectedQuotation.coverage}</p>
              </div>

              <Button className="w-full" asChild>
                <Link href={getCompanyRoute(selectedQuotation.company)}>Seleccionar esta Cobertura</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    )
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
              <BreadcrumbPage>Resultados de Cotización</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resultados de Cotización</h1>
            <p className="text-muted-foreground">
              {vehicleBrands.find((b) => b.id === selectedBrand)?.name} {selectedModel} {selectedVersion}{" "}
              {selectedYear}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleGeneratePDF}>
              <FileDown className="mr-2 size-4" />
              Generar PDF
            </Button>
            <Button variant="outline" onClick={handleBackFromResults}>
              <ArrowLeft className="mr-2 size-4" />
              Volver
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quotationResults.map((result) => (
            <Card key={result.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-center mb-4 h-24">
                  <img
                    src={result.logo || "/placeholder.svg"}
                    alt={result.company}
                    className="max-h-24 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                </div>
                <CardTitle className="text-center text-lg">{result.coverage}</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col flex-1">
                <div className="flex-1 border-t pt-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Prima Anual</p>
                    <p className="text-2xl font-bold text-primary">${result.price.toLocaleString("es-AR")}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ${result.pricePerMonth.toLocaleString("es-AR")}/mes
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  {/* Removed "Ver Detalle" button */}
                  <Button className="w-full" asChild>
                    <Link href={getCompanyRoute(result.company)}>Seleccionar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SidebarInset>
  )
  //}

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
            <p className="text-muted-foreground">Paso {currentStep} de 5</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`flex size-8 items-center justify-center rounded-full border-2 ${step < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : step === currentStep
                    ? "border-primary text-primary"
                    : "border-muted text-muted-foreground"
                  }`}
              >
                {step < currentStep ? <Check className="size-4" /> : step}
              </div>
              {step < 5 && <div className={`h-0.5 flex-1 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Selecciona la Marca del Vehículo"}
              {currentStep === 2 && "Selecciona el Modelo"}
              {currentStep === 3 && "Selecciona la Versión"}
              {currentStep === 4 && "Selecciona el Año"}
              {currentStep === 5 && "Completa los Datos"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Elige la marca del vehículo a cotizar"}
              {currentStep === 2 && `Elige el modelo de ${vehicleBrands.find((b) => b.id === selectedBrand)?.name}`}
              {currentStep === 3 && "Selecciona la versión del vehículo"}
              {currentStep === 4 && "Selecciona el año del vehículo"}
              {currentStep === 5 && "Completa la información adicional para la cotización"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar marca..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredBrands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => {
                        setSelectedBrand(brand.id)
                        setBrandSearch("")
                      }}
                      className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 p-6 transition-all hover:border-primary ${selectedBrand === brand.id ? "border-primary bg-primary/5" : "border-border"
                        }`}
                    >
                      <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="size-16 object-contain" />
                      <span className="font-medium">{brand.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <RadioGroup value={selectedModel} onValueChange={setSelectedModel}>
                <div className="grid gap-3">
                  {vehicleModels[selectedBrand]?.map((model) => (
                    <div
                      key={model}
                      className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${selectedModel === model ? "border-primary bg-primary/5" : "border-border"
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
              <RadioGroup value={selectedVersion} onValueChange={setSelectedVersion}>
                <div className="grid gap-3">
                  {availableVersions.map((version) => (
                    <div
                      key={version}
                      className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${selectedVersion === version ? "border-primary bg-primary/5" : "border-border"
                        }`}
                    >
                      <RadioGroupItem value={version} id={version} />
                      <Label htmlFor={version} className="flex-1 cursor-pointer font-medium">
                        {version}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {currentStep === 4 && (
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
                      {vehicleBrands.find((b) => b.id === selectedBrand)?.name} {selectedModel} {selectedVersion}{" "}
                      {selectedYear}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="postal-code">Código Postal *</Label>
                    <Input
                      id="postal-code"
                      placeholder="Ej: 1425"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm font-medium mb-2">Resumen:</p>
                  <p className="text-sm">
                    <span className="font-semibold">Vehículo:</span>{" "}
                    {vehicleBrands.find((b) => b.id === selectedBrand)?.name} {selectedModel} {selectedVersion}{" "}
                    {selectedYear}
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
          {currentStep < 5 ? (
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
