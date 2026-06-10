import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import { Link } from '@/routing';
import { ShieldAlert } from 'lucide-react';

export default async function UnauthorizedPage({ params }: { params: Promise<{ locale: string }> }) {
    const locale = (await params).locale;
    setRequestLocale(locale);

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <ShieldAlert className="w-12 h-12 text-destructive" />
                    </div>
                    <CardTitle className="text-2xl">Unauthorized Access</CardTitle>
                    <CardDescription>
                        You do not have the necessary permissions to view this page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
