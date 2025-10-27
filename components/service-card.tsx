import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, DollarSign } from "lucide-react"

interface ServiceCardProps {
  type: string
  price: string
  quantity: string
  deliveryTime: string
  description: string
  features: string[]
}

export function ServiceCard({ type, price, quantity, deliveryTime, description, features }: ServiceCardProps) {
  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline">{quantity}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime}</span>
          </div>
        </div>
        <CardTitle className="text-xl">{type}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4 flex items-baseline gap-1">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <span className="text-3xl font-bold">{price.replace("$", "")}</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Ordenar Ahora</Button>
      </CardFooter>
    </Card>
  )
}
