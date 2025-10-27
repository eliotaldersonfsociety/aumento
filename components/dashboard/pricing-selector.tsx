"use client";

import { useState, useEffect, useTransition } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Clock,
  DollarSign,
  Package,
  CheckCircle2,
  Video,
  Link as LinkIcon,
} from "lucide-react";
import { saveOrder } from "@/app/actions/saveOrder";
import { getSettings } from "@/app/actions/settings";

const iconMap: Record<string, any> = {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Video,
};

export function PricingSelector() {
  const [servicesData, setServicesData] = useState<any>({});
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [postUrl, setPostUrl] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [usdToCop, setUsdToCop] = useState<number>(4200);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings();
      setUsdToCop(Number(settings.exchangeRate));
    };
    fetchSettings();
  }, []);

  // Cargar JSON dinámico
  useEffect(() => {
    if (selectedService) {
      const fileName = selectedService.toLowerCase().trim();
      fetch(`/data/${fileName}.json`)
        .then((res) => {
          if (!res.ok) throw new Error("No se pudo cargar el JSON");
          return res.json();
        })
        .then((data) => {
          const normalizedData =
            data[selectedService] && data[selectedService].categories
              ? data[selectedService]
              : data;

          setServicesData({ [selectedService]: normalizedData });
          setSelectedCategory("");
          setSelectedType("");
          setQuantity("");
          setPostUrl("");
          setSuccessMsg("");
          setErrorMsg("");
        })
        .catch((error) => {
          console.error("❌ Error al cargar JSON:", error);
          setServicesData({});
        });
    }
  }, [selectedService]);

  // Derived values
  const serviceKeys = ["Instagram", "Youtube", "Facebook", "Twitter"];
  const categoryKeys = selectedService
    ? Object.keys(servicesData[selectedService]?.categories || {})
    : [];
  const typeKeys = selectedCategory && selectedService
    ? Object.keys(
        servicesData[selectedService]?.categories?.[selectedCategory]?.types ||
          {}
      )
    : [];

  const selectedData =
    selectedService && selectedCategory && selectedType
      ? servicesData[selectedService].categories[selectedCategory].types[
          selectedType
        ]
      : null;

  const ServiceIcon = selectedService ? iconMap[selectedService] || Video : null;

  // Custom comments detection
  const isCustom = selectedType.toLowerCase().includes("personalizado");
  const lineCount = isCustom
    ? quantity
        .split("\n")
        .filter((line) => line.trim() !== "")
        .length
    : Number.parseInt(quantity) || 0;

  const totalPriceUSD = selectedData
    ? (selectedData.pricePerUnit * lineCount).toFixed(2)
    : "0.00";
  const totalPriceCOP = selectedData
    ? Math.round(selectedData.pricePerUnit * lineCount * usdToCop).toLocaleString(
        "es-CO"
      )
    : "0";

  const isValidQuantity =
    selectedData &&
    lineCount >= selectedData.minQuantity &&
    lineCount <= selectedData.maxQuantity;

  // -------------------------
  // Client-side URL validation
  // -------------------------
  function validateUrlClient(url: string) {
    try {
      const parsed = new URL(url.trim());
      if (parsed.protocol !== "https:") return false;

      const allowed = [
        "instagram.com",
        "facebook.com",
        "youtube.com",
        "tiktok.com",
        "x.com",
        "twitter.com",
        "www.instagram.com",
        "www.facebook.com",
        "www.youtube.com",
        "www.tiktok.com",
        "www.x.com",
        "www.twitter.com",
      ];

      const hostname = parsed.hostname.toLowerCase();
      const ok = allowed.some(
        (d) => hostname === d || hostname.endsWith("." + d)
      );
      return ok;
    } catch {
      return false;
    }
  }

  // Build FormData to pass to saveOrder (server action)
  function buildOrderFormData() {
    const fd = new FormData();
    fd.set("servicio", selectedService);
    fd.set("categoria", selectedCategory);
    fd.set("tipo", selectedType);
    fd.set("cantidad", lineCount.toString());
    fd.set("link", postUrl.trim());
    fd.set("precioUSD", totalPriceUSD);
    fd.set("precioCOP", totalPriceCOP);

    // 👇 Enviar comentarios personalizados si aplica
    if (isCustom) {
      fd.set("customComments", quantity); // texto con saltos de línea
    }

    return fd;
  }

  // Client submit that validates URL and calls server action via startTransition
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!selectedService || !selectedCategory || !selectedType) {
      setErrorMsg("Completa servicio, categoría y tipo antes de enviar.");
      return;
    }
    if (!isValidQuantity) {
      setErrorMsg("Cantidad inválida según los límites del servicio.");
      return;
    }
    if (!postUrl || !validateUrlClient(postUrl)) {
      setErrorMsg(
        "El enlace no es válido. Debe ser HTTPS y de Instagram/Facebook/YouTube/TikTok/X/Twitter."
      );
      return;
    }

    const fd = buildOrderFormData();

    startTransition(() => {
      (async () => {
        try {
          const result = await saveOrder(fd); // espera la respuesta del server action

          if (result?.error) {
            setErrorMsg(result.error);
            return;
          }

          setSuccessMsg("✅ Pedido enviado con éxito");
          // reset form
          setSelectedService("");
          setSelectedCategory("");
          setSelectedType("");
          setQuantity("");
          setPostUrl("");
        } catch (err: any) {
          console.error("Error saveOrder:", err);
          setErrorMsg(err?.message ?? "Error al enviar el pedido en el servidor.");
        }
      })();
    });
  }

  return (
    <section id="precios" className="border-t border-border/50 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-white">
            Selecciona tu Servicio
          </h2>
          <p className="text-lg text-white/80">
            Elige la plataforma y el tipo de servicio que necesitas para hacer
            crecer tu presencia.
          </p>
        </div>

        <div className="glass border-white rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1️⃣ Servicio */}
            <div className="space-y-2">
              <Label htmlFor="service" className="font-semibold text-white">
                1. Selecciona el Servicio
              </Label>
              <Select
                value={selectedService}
                onValueChange={(v: string) => setSelectedService(v)}
              >
                <SelectTrigger
                  id="service"
                  className="bg-white/50 h-12 border-white text-black"
                >
                  <SelectValue placeholder="Elige una plataforma..." />
                </SelectTrigger>
                <SelectContent>
                  {serviceKeys.map((service) => {
                    const Icon = iconMap[service] || Video;
                    return (
                      <SelectItem key={service} value={service}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-black" />
                          <span className="text-black truncate">{service}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* 2️⃣ Categoría */}
            {selectedService && categoryKeys.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white font-semibold">
                  2. Selecciona la Categoría
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value: string) => {
                    setSelectedCategory(value);
                    setSelectedType("");
                    setQuantity("");
                    setPostUrl("");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                >
                  <SelectTrigger
                    id="category"
                    className="bg-white/50 h-12 border-white text-black max-w-full"
                  >
                    <SelectValue
                      placeholder="Elige una categoría..."
                      className="truncate"
                    />
                  </SelectTrigger>
                  <SelectContent className="max-w-[90vw] sm:max-w-[420px]">
                    {categoryKeys.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="max-w-[400px]"
                      >
                        <div
                          className="truncate"
                          style={{ maxWidth: 360 }}
                          title={category}
                        >
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 3️⃣ Tipo */}
            {selectedCategory && typeKeys.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="type" className="text-white font-semibold">
                  3. Selecciona el Tipo de Servicio
                </Label>
                <Select
                  value={selectedType}
                  onValueChange={(v: string) => setSelectedType(v)}
                >
                  <SelectTrigger
                    id="type"
                    className="bg-white/50 h-12 border-white text-black"
                  >
                    <SelectValue
                      placeholder="Elige el tipo de servicio..."
                      className="truncate"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {typeKeys.map((type) => (
                      <SelectItem key={type} value={type}>
                        <div
                          className="truncate"
                          style={{ maxWidth: 360 }}
                          title={type}
                        >
                          {type}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 4️⃣ Cantidad o comentarios */}
            {selectedType && selectedData && (
              <div className="space-y-2">
                <Label
                  htmlFor="quantity"
                  className="text-white font-semibold"
                >
                  4.{" "}
                  {isCustom
                    ? "Escribe los Comentarios Personalizados"
                    : "Ingresa la Cantidad"}
                </Label>

                {isCustom ? (
                  <>
                    <textarea
                      id="customComments"
                      placeholder="Un comentario por línea..."
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="bg-white/50 border-white h-32 w-full text-black p-3 rounded-lg resize-none"
                    />
                    <div className="flex justify-between items-center text-sm">
                      <p
                        className={
                          isValidQuantity
                            ? "text-green-400 font-medium"
                            : "text-red-400 font-medium"
                        }
                      >
                        {lineCount} comentario{lineCount !== 1 ? "s" : ""}{" "}
                        escrito
                      </p>
                      <p className="text-white/70">
                        Mín: {selectedData.minQuantity} • Máx:{" "}
                        {selectedData.maxQuantity}
                      </p>
                    </div>
                  </>
                ) : (
                  <Input
                    id="quantity"
                    type="number"
                    placeholder={`Mínimo ${selectedData.minQuantity}, Máximo ${selectedData.maxQuantity}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="bg-white/50 border-white h-12 text-black"
                  />
                )}
              </div>
            )}

            {/* 5️⃣ URL */}
            {selectedData && isValidQuantity && (
              <div className="space-y-2">
                <Label
                  htmlFor="postUrl"
                  className="text-white font-semibold flex items-center gap-2"
                >
                  5. Ingresa el Link del Post o Perfil
                  <LinkIcon className="h-4 w-4 text-white/80" />
                </Label>
                <Input
                  id="postUrl"
                  name="postUrl"
                  type="url"
                  placeholder="https://www.instagram.com/p/ejemplo/  "
                  value={postUrl}
                  onChange={(e) => {
                    setPostUrl(e.target.value);
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className="bg-white/50 border-white h-12 text-black"
                />
              </div>
            )}

            {/* Error / Success UI */}
            {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
            {successMsg && (
              <p className="text-sm text-green-400">{successMsg}</p>
            )}

            {/* 6️⃣ Enviar (cliente -> server action) */}
            {selectedData && isValidQuantity && postUrl && (
              <div className="mt-2 text-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {isPending ? "Enviando..." : "Enviar Pedido"}
                </button>
              </div>
            )}

            {/* 7️⃣ Resultados (información resumen) */}
            {selectedData && isValidQuantity && postUrl && (
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-3 border-t border-border/50 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    <ServiceIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {selectedType}
                    </h3>
                    <p className="text-sm text-white/70">{selectedService}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="glass p-4 rounded-xl flex items-start gap-3">
                    <Package className="h-5 w-5 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">Cantidad</p>
                      <p className="text-xl font-bold text-white">{lineCount}</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">Costo Total</p>
                      <p className="text-lg font-bold text-white">
                        ${totalPriceUSD} USD
                      </p>
                      <p className="text-sm text-white/70">
                        ${totalPriceCOP} COP
                      </p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-xl flex items-start gap-3">
                    <Clock className="h-5 w-5 text-white/80" />
                    <div>
                      <p className="text-sm text-white/70">Tiempo</p>
                      <p className="text-xl font-bold text-white">
                        {selectedData.deliveryTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h4 className="mb-3 font-bold text-white">
                    Descripción del Servicio
                  </h4>
                  <p className="mb-4 text-white/90">
                    {selectedData.description}
                  </p>
                  <ul className="space-y-2">
                    {selectedData.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-white/80">
                        <CheckCircle2 className="h-4 w-4 text-white/40" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}