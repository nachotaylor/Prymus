"use client"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import Link from "next/link"

const producersData = [
  { producer: "Juan Pérez", policies: 45, quotations: 120, commission: 125000, conversionRate: "37.5%" },
  { producer: "María González", policies: 38, quotations: 95, commission: 98000, conversionRate: "40.0%" },
  { producer: "Carlos Rodríguez", policies: 52, quotations: 140, commission: 156000, conversionRate: "37.1%" },
  { producer: "Ana Martínez", policies: 29, quotations: 78, commission: 72000, conversionRate: "37.2%" },
]

const comparisonData = [
  { producer: "Juan Pérez", quotations: 120, policies: 45 },
  { producer: "María González", quotations: 95, policies: 38 },
  { producer: "Carlos Rodríguez", quotations: 140, policies: 52 },
  { producer: "Ana Martínez", quotations: 78, policies: 29 },
]

export default function ReportsPage() {
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
              <BreadcrumbPage>Reportes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground">Análisis de rendimiento por productor</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pólizas Emitidas por Productor</CardTitle>
            <CardDescription>Cantidad de pólizas emitidas en el último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Productor</TableHead>
                  <TableHead className="text-right">Pólizas Emitidas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {producersData.map((producer) => (
                  <TableRow key={producer.producer}>
                    <TableCell className="font-medium">{producer.producer}</TableCell>
                    <TableCell className="text-right font-semibold">{producer.policies}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cotizaciones por Productor</CardTitle>
            <CardDescription>Cantidad de cotizaciones realizadas en el último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Productor</TableHead>
                  <TableHead className="text-right">Cotizaciones Realizadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {producersData.map((producer) => (
                  <TableRow key={producer.producer}>
                    <TableCell className="font-medium">{producer.producer}</TableCell>
                    <TableCell className="text-right font-semibold">{producer.quotations}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comisiones Generadas por Productor</CardTitle>
            <CardDescription>Comisiones en pesos argentinos del último mes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Productor</TableHead>
                  <TableHead className="text-right">Comisión Generada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {producersData.map((producer) => (
                  <TableRow key={producer.producer}>
                    <TableCell className="font-medium">{producer.producer}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${producer.commission.toLocaleString("es-AR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cotizaciones vs Pólizas Emitidas</CardTitle>
            <CardDescription>Comparación de cotizaciones realizadas y pólizas emitidas por productor</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                quotations: {
                  label: "Cotizaciones",
                  color: "hsl(var(--chart-1))",
                },
                policies: {
                  label: "Pólizas Emitidas",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[400px]"
            >
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="producer" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="quotations" fill="var(--color-quotations)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="policies" fill="var(--color-policies)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
