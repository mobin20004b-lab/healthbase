import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { getClinicById } from "@/services/clinics";
import { Badge } from "@/web/components/ui/badge";
import { Button } from "@/web/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/web/components/ui/tabs";
import { Card, CardContent } from "@/web/components/ui/card";
import { MapPin, Phone, Globe, Star, Check, Share2, Heart } from "lucide-react";

export default async function ClinicDetailPage({
    params
}: {
    params: Promise<{ id: string; locale: string }>
}) {
    const { id, locale } = await params;
    const t = await getTranslations("ClinicDetail");
    const tCommon = await getTranslations("Clinics");

    const clinic = await getClinicById(id, locale);

    if (!clinic) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Image */}
                <div className="relative w-full md:w-96 h-64 md:h-80 rounded-xl overflow-hidden shadow-md shrink-0 bg-muted">
                    {clinic.image ? (
                        <Image
                            src={clinic.image}
                            alt={clinic.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 384px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <MapPin className="w-12 h-12 opacity-20" />
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">{clinic.name}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span>{clinic.address}, {clinic.city}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Heart className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {clinic.isVerified && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                    <Check className="w-3 h-3 mr-1" />
                                    {t("verified")}
                                </Badge>
                            )}
                            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full text-sm font-medium">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{clinic.averageRating.toFixed(1)}</span>
                                <span className="opacity-70">({clinic.reviewCount})</span>
                            </div>
                        </div>

                        <p className="text-muted-foreground line-clamp-3 mb-6">
                            {clinic.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {clinic.phone && (
                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                <div className="p-2 rounded-full bg-primary/10 text-primary">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{t("phone")}</p>
                                    <p className="font-medium">{clinic.phone}</p>
                                </div>
                            </div>
                        )}
                        {clinic.website && (
                            <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                <div className="p-2 rounded-full bg-primary/10 text-primary">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{t("website")}</p>
                                    <a
                                        href={clinic.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium hover:underline text-primary"
                                    >
                                        {new URL(clinic.website).hostname}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mb-6">
                    <TabsTrigger value="services">{t("services")}</TabsTrigger>
                    <TabsTrigger value="insurance">{tCommon("insurance")}</TabsTrigger>
                    <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">{t("services")}</h2>
                            {clinic.services.length > 0 ? (
                                <div className="grid gap-4">
                                    {clinic.services.map((service) => (
                                        <div key={service.id} className="flex justify-between items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                            <div className="font-medium">{service.name}</div>
                                            {/* Price placeholder */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">{t("noServices")}</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="insurance">
                    <Card>
                        <CardContent className="p-6">
                             <h2 className="text-xl font-semibold mb-4">{tCommon("insurance")}</h2>
                             <p className="text-muted-foreground">
                                Contact clinic for insurance information.
                             </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">{t("reviews")}</h2>
                                <Button>{t("writeReview")}</Button>
                            </div>

                            {clinic.reviews && clinic.reviews.length > 0 ? (
                                <div className="space-y-4">
                                     <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-2xl font-bold">{clinic.averageRating.toFixed(1)}</span>
                                        <span className="text-muted-foreground">based on {clinic.reviewCount} reviews</span>
                                     </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">{t("noReviews")}</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
