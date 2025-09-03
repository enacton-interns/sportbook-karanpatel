import { SignUpForm } from "@/components/auth/signup-form";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-1/2 relative">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center p-6">
        <Card className="w-full max-w-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
