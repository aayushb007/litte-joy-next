"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star, Grid, List, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ToysPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedAge, setSelectedAge] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { state, dispatch } = useCart()

  const toyProducts = [
    {
      id: 1,
      name: "Wooden Stacking Rings",
      price: 28,
      image: "/images/wooden-stacking-rings.png",
      category: "developmental",
      ageRange: "6-18M",
      skills: ["Hand-eye coordination", "Problem solving"],
      rating: 4.9,
      reviews: 234,
      isNew: false,
      isBestseller: true,
      description: "Classic wooden toy that promotes fine motor skills and color recognition",
    },
    {
      id: 2,
      name: "Sensory Play Blocks",
      price: 35,
      originalPrice: 45,
      image: "/images/sensory-blocks.png",
      category: "sensory",
      ageRange: "3-12M",
      skills: ["Sensory development", "Texture exploration"],
      rating: 4.6,
      reviews: 189,
      isNew: true,
      isBestseller: false,
      description: "Soft textured blocks perfect for sensory exploration and teething",
    },
    {
      id: 3,
      name: "Musical Activity Cube",
      price: 52,
      image: "/images/musical-activity-cube.png",
      category: "musical",
      ageRange: "12-24M",
      skills: ["Musical awareness", "Cause and effect"],
      rating: 4.8,
      reviews: 156,
      isNew: false,
      isBestseller: true,
      description: "Interactive cube with lights, sounds, and multiple activities",
    },
    {
      id: 4,
      name: "Organic Cotton Rattle Set",
      price: 22,
      image: "/images/organic-rattles.png",
      category: "infant",
      ageRange: "0-6M",
      skills: ["Grasping", "Auditory development"],
      rating: 4.7,
      reviews: 298,
      isNew: false,
      isBestseller: false,
      description: "Gentle rattles made from organic materials, perfect for newborns",
    },
    {
      id: 5,
      name: "Shape Sorting Puzzle",
      price: 38,
      originalPrice: 48,
      image: "/images/shape-sorting-puzzle.png",
      category: "educational",
      ageRange: "18-36M",
      skills: ["Shape recognition", "Problem solving"],
      rating: 4.9,
      reviews: 167,
      isNew: true,
      isBestseller: true,
      description: "Colorful wooden puzzle that teaches shapes and problem-solving",
    },
    {
      id: 6,
      name: "Montessori Ball Tracker",
      price: 45,
      image: "/images/montessori-ball-tracker.png",
      category: "montessori",
      ageRange: "6-18M",
      skills: ["Visual tracking", "Cause and effect"],
      rating: 4.8,
      reviews: 203,
      isNew: false,
      isBestseller: false,
      description: "Beautiful wooden ball tracker following Montessori principles",
    },
  ]

  const ageRanges = [
    { value: "all", label: "All Ages" },
    { value: "0-6M", label: "0-6 Months" },
    { value: "6-18M", label: "6-18 Months" },
    { value: "12-24M", label: "12-24 Months" },
    { value: "18-36M", label: "18-36 Months" },
  ]

  const filteredProducts =
    selectedAge === "all" ? toyProducts : toyProducts.filter((product) => product.ageRange === selectedAge)

  const addToCart = (product: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
      },
    })
    dispatch({ type: "OPEN_CART" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-100 dark:border-gray-700 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Little Joy
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Baby Care</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/clothing"
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 font-medium"
              >
                Clothing
              </Link>
              <Link
                href="/toys"
                className="text-purple-600 dark:text-purple-400 font-semibold border-b-2 border-purple-600 dark:border-purple-400 pb-1"
              >
                Toys
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 font-medium"
              >
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
              >
                <ShoppingBag className="w-5 h-5" />
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-purple-500 hover:bg-purple-600">
                    {state.totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-purple-50 dark:hover:bg-gray-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-5 h-5">
                  <span
                    className={`absolute block h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-gray-600 dark:bg-gray-300 transform transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 border-t border-blue-100 dark:border-gray-700">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/clothing"
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium hover:translate-x-2 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clothing
                </Link>
                <Link
                  href="/toys"
                  className="text-purple-600 dark:text-purple-400 font-semibold hover:translate-x-2 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Toys
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium hover:translate-x-2 hover:bg-purple-50 dark:hover:bg-gray-800 p-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Educational{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Toys</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Carefully curated toys that inspire learning, creativity, and development through play. Safe, sustainable,
              and designed to grow with your child.
            </p>
          </div>

          {/* Benefits Banner */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Safety Certified</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">All toys meet international safety standards</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Eco-Friendly</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Made from sustainable, non-toxic materials</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Expert Approved</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Recommended by child development specialists</p>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="w-48 border-purple-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-purple-200 dark:border-gray-600">
                  {ageRanges.map((age) => (
                    <SelectItem
                      key={age.value}
                      value={age.value}
                      className="text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-gray-700"
                    >
                      {age.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48 border-purple-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-purple-200 dark:border-gray-600">
                  <SelectItem
                    value="featured"
                    className="text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-gray-700"
                  >
                    Featured
                  </SelectItem>
                  <SelectItem
                    value="price-low"
                    className="text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-gray-700"
                  >
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    value="price-high"
                    className="text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-gray-700"
                  >
                    Price: High to Low
                  </SelectItem>
                  <SelectItem
                    value="age"
                    className="text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-gray-700"
                  >
                    Age Range
                  </SelectItem>
                  <SelectItem
                    value="rating"
                    className="text-gray-900 dark:text-gray-100 hover:bg-purple-50 dark:hover:bg-gray-700"
                  >
                    Highest Rated
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "border-purple-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                }
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-purple-500 hover:bg-purple-600"
                    : "border-purple-200 dark:border-gray-600 hover:bg-purple-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:-translate-y-2 animate-in fade-in duration-700 border border-gray-100 dark:border-gray-700 ${
                  viewMode === "list" ? "flex" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`relative overflow-hidden ${viewMode === "list" ? "w-64 flex-shrink-0" : ""} rounded-l-2xl`}
                >
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>}
                    {product.isBestseller && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Bestseller</Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>

                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className={`${viewMode === "list" ? "w-full h-64" : "w-full h-80"} object-cover group-hover:scale-110 transition-transform duration-500`}
                    unoptimized
                  />
                </div>

                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs capitalize bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Age:</span>
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        {product.ageRange}
                      </Badge>
                    </div>

                    <div className="mb-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">Develops:</span>
                      <div className="flex flex-wrap gap-1">
                        {product.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-800 dark:text-gray-100">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-purple-500 hover:bg-purple-600 text-white transform hover:scale-105 transition-all duration-200"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 bg-transparent"
            >
              Load More Toys
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
