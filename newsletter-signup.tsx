import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Facebook, Twitter, Github } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {/* Logo/Brand Mark */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">BrandName</h2>
          </div>

          {/* Headlines */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Get the latest updates, exclusive content, and insider tips delivered straight to your inbox every week.
            </p>
          </div>

          {/* Social Sign-up Options */}
          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full bg-white text-gray-700 border-gray-200 hover:bg-gray-50">
              <Facebook className="w-4 h-4 mr-2 text-blue-600" />
              Continue with Facebook
            </Button>
            <Button variant="outline" className="w-full bg-white text-gray-700 border-gray-200 hover:bg-gray-50">
              <Twitter className="w-4 h-4 mr-2 text-blue-400" />
              Continue with Twitter
            </Button>
            <Button variant="outline" className="w-full bg-white text-gray-700 border-gray-200 hover:bg-gray-50">
              <Github className="w-4 h-4 mr-2 text-gray-900" />
              Continue with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <Separator />
            <div className="absolute inset-0 flex justify-center">
              <span className="bg-white px-3 text-sm text-gray-500">or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
            >
              Subscribe Now
            </Button>
          </form>

          {/* Additional Links */}
          <div className="text-center space-y-2 mb-6">
            <div className="flex justify-center space-x-4 text-sm">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Help
              </a>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              🔒 We respect your privacy. Unsubscribe at any time.
              <br />
              No spam, ever. Only valuable content.
            </p>
          </div>
        </div>

        {/* Footer Trust Message */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Join 10,000+ subscribers who trust us with their inbox</p>
        </div>
      </div>
    </div>
  )
}
