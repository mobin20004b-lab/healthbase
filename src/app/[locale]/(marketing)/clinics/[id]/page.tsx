import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getClinicById } from '@/services/clinics';
import { MapPin, Star, Phone, Globe, Check, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/web/components/ui/button';
import { Card } from '@/web/components/ui/card';
import { Link } from '@/routing';

interface ClinicDetailPageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

export default async function ClinicDetailPage({ params }: ClinicDetailPageProps) {
    const { id, locale } = await params;

    // Fetch clinic data
    const clinic = await getClinicById(id, locale);

    if (!clinic) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/search" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
                Back to Search
            </Link>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div>
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">{clinic.name}</h1>
                                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{clinic.city}, {clinic.province}, {clinic.country}</span>
                                </div>
                            </div>
                            {clinic.isVerified && (
                                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                    <Check className="h-4 w-4" />
                                    Verified
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg font-bold">{clinic.averageRating.toFixed(1)}</span>
                                <span className="text-muted-foreground">({clinic.reviewCount} reviews)</span>
                            </div>
                            <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">Available Tomorrow</span>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                        {clinic.image ? (
                            <Image
                                src={clinic.image}
                                alt={clinic.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Overview */}
                    <section>
                        <h2 className="mb-4 text-xl font-semibold">About</h2>
                        <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                            {clinic.description || "No description provided."}
                        </p>
                    </section>

                    {/* Services */}
                    {clinic.services && clinic.services.length > 0 && (
                        <section>
                            <h2 className="mb-4 text-xl font-semibold">Services & Pricing</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {clinic.services.map((service) => (
                                    <Card key={service.id} className="p-4 border-none bg-surface-container-low">
                                        <h3 className="font-medium">{service.name}</h3>
                                        {service.description && (
                                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                                        )}
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm font-medium text-primary">
                                                {service.priceMin ? (
                                                    service.priceMax ?
                                                    `${service.priceMin.toLocaleString()} - ${service.priceMax.toLocaleString()} ${service.currency}` :
                                                    `From ${service.priceMin.toLocaleString()} ${service.currency}`
                                                ) : "Price on request"}
                                            </span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Reviews Placeholder */}
                    <section>
                        <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
                         {clinic.reviewCount > 0 ? (
                            <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
                                <p>Reviews are coming soon.</p>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No reviews yet.</p>
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Contact Card */}
                    <Card className="p-6 sticky top-24">
                        <h3 className="mb-4 font-semibold">Contact Information</h3>
                        <div className="space-y-4">
                            {clinic.phone && (
                                <div className="flex items-start gap-3">
                                    <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Phone</p>
                                        <a href={`tel:${clinic.phone}`} className="text-sm text-primary hover:underline">
                                            {clinic.phone}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {clinic.address && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Address</p>
                                        <p className="text-sm text-muted-foreground">{clinic.address}</p>
                                        <p className="text-sm text-muted-foreground">{clinic.city}, {clinic.province}</p>
                                    </div>
                                </div>
                            )}
                            {clinic.website && (
                                <div className="flex items-start gap-3">
                                    <Globe className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Website</p>
                                        <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                                            Visit Website
                                        </a>
                                    </div>
                                </div>
                            )}

                            <Button className="w-full mt-4" size="lg">
                                Book Appointment
                            </Button>
                        </div>
                    </Card>

                    {/* Specialties */}
                    {clinic.specialties && clinic.specialties.length > 0 && (
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 font-semibold">Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                                {clinic.specialties.map((specialty) => (
                                    <div key={specialty.id} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                                        {specialty.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Insurances */}
                    {clinic.insurances && clinic.insurances.length > 0 && (
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 font-semibold">Accepted Insurance</h3>
                            <ul className="space-y-2">
                                {clinic.insurances.map((insurance) => (
                                    <li key={insurance.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="h-3.5 w-3.5 text-green-500" />
                                        {insurance.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
