"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ClothingPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const clothingProducts = [
    {
      id: 1,
      name: "Organic Cotton Onesie Set",
      price: 45,
      originalPrice: 60,
      image: "/images/baby-onesie-set.png",
      category: "onesies",
      size: ["0-3M", "3-6M", "6-9M", "9-12M"],
      colors: ["Pink", "Blue", "White", "Yellow"],
      rating: 4.8,
      reviews: 124,
      isNew: true,
      description: "Ultra-soft organic cotton onesies perfect for everyday wear",
    },
    {
      id: 2,
      name: "Bamboo Fiber Sleep Set",
      price: 52,
      originalPrice: 68,
      image: "/images/bamboo-sleep-set.png",
      category: "sleepwear",
      size: ["0-3M", "3-6M", "6-9M", "9-12M"],
      colors: ["Lavender", "Mint", "Peach"],
      rating: 4.7,
      reviews: 89,
      isNew: true,
      description: "Temperature-regulating bamboo fiber for perfect sleep",
    },
    {
      id: 3,
      name: "Merino Wool Cardigan",
      price: 78,
      originalPrice: 95,
      image: "/images/baby-cardigan.png",
      category: "outerwear",
      size: ["3-6M", "6-9M", "9-12M", "12-18M"],
      colors: ["Cream", "Gray", "Navy"],
      rating: 4.9,
      reviews: 156,
      isNew: false,
      description: "Luxuriously soft merino wool for ultimate comfort",
    },
    {
      id: 4,
      name: "Cotton Romper Collection",
      price: 38,
      image: "/images/cotton-romper.png",
      category: "rompers",
      size: ["0-3M", "3-6M", "6-9M"],
      colors: ["Coral", "Sage", "Dusty Rose"],
      rating: 4.6,
      reviews: 203,
      isNew: false,
      description: "Playful rompers for active little ones",
    },
    {
      id: 5,
      name: "Organic Footie Pajamas",
      price: 42,
      image: "/images/footie-pajamas.png",
      category: "sleepwear",
      size: ["0-3M", "3-6M", "6-9M", "9-12M"],
      colors: ["Cloud", "Moon", "Star"],
      rating: 4.8,
      reviews: 167,
      isNew: true,
      description: "Cozy footie pajamas for peaceful nights",
    },
    {
      id: 6,
      name: "Linen Summer Outfit",
      price: 55,
      originalPrice: 70,
      image: "/images/linen-summer-outfit.png",
      category: "summer",
      size: ["3-6M", "6-9M", "9-12M"],
      colors: ["Natural", "Soft Pink", "Sky Blue"],
      rating: 4.7,
      reviews: 98,
      isNew: false,
      description: "Breathable linen for warm weather comfort",
    },
  ]

  const categories = [
    { value: "all", label: "All Clothing" },
    { value: "onesies", label: "Onesies" },
    { value: "sleepwear", label: "Sleepwear" },
    { value: "outerwear", label: "Outerwear" },
    { value: "rompers", label: "Rompers" },
    { value: "summer", label: "Summer Collection" },
  ]

  const filteredProducts =
    selectedCategory === "all"
      ? clothingProducts
      : clothingProducts.filter((product) => product.category === selectedCategory)

  const { state, dispatch } = useCart()

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-pink-100 dark:border-gray-700 transition-all duration-300">
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
                className="text-pink-600 dark:text-pink-400 font-semibold border-b-2 border-pink-600 dark:border-pink-400 pb-1"
              >
                Clothing
              </Link>
              <Link
                href="/toys"
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200 font-medium"
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
                className="relative hover:bg-pink-50 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
              >
                <ShoppingBag className="w-5 h-5" />
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-pink-500 hover:bg-pink-600">
                    {state.totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-pink-50 dark:hover:bg-gray-800 transition-all duration-300"
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
            <div className="py-4 border-t border-pink-100 dark:border-gray-700">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/clothing"
                  className="text-pink-600 dark:text-pink-400 font-semibold hover:translate-x-2 hover:bg-pink-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clothing
                </Link>
                <Link
                  href="/toys"
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium hover:translate-x-2 hover:bg-pink-50 dark:hover:bg-gray-800 p-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Toys
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 font-medium hover:translate-x-2 hover:bg-pink-50 dark:hover:bg-gray-800 p-3 rounded-lg"
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
              Premium Baby{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Clothing
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our collection of organic, sustainable, and incredibly soft clothing designed for your baby's
              comfort and your peace of mind.
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-pink-200 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-pink-200 dark:border-gray-600">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="text-gray-900 dark:text-gray-100 hover:bg-pink-50 dark:hover:bg-gray-700"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48 border-pink-200 dark:border-gray-600 focus:border-pink-400 dark:focus:border-pink-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-pink-200 dark:border-gray-600">
                  <SelectItem
                    value="featured"
                    className="text-gray-900 dark:text-gray-100 hover:bg-pink-50 dark:hover:bg-gray-700"
                  >
                    Featured
                  </SelectItem>
                  <SelectItem
                    value="price-low"
                    className="text-gray-900 dark:text-gray-100 hover:bg-pink-50 dark:hover:bg-gray-700"
                  >
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    value="price-high"
                    className="text-gray-900 dark:text-gray-100 hover:bg-pink-50 dark:hover:bg-gray-700"
                  >
                    Price: High to Low
                  </SelectItem>
                  <SelectItem
                    value="newest"
                    className="text-gray-900 dark:text-gray-100 hover:bg-pink-50 dark:hover:bg-gray-700"
                  >
                    Newest First
                  </SelectItem>
                  <SelectItem
                    value="rating"
                    className="text-gray-900 dark:text-gray-100 hover:bg-pink-50 dark:hover:bg-gray-700"
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
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "border-pink-200 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                    ? "bg-pink-500 hover:bg-pink-600"
                    : "border-pink-200 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 z-10 bg-green-500 hover:bg-green-600 text-white">New</Badge>
                  )}
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

                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Sizes:</span>
                      <div className="flex space-x-1">
                        {product.size.slice(0, 3).map((size) => (
                          <Badge
                            key={size}
                            variant="outline"
                            className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            {size}
                          </Badge>
                        ))}
                        {product.size.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            +{product.size.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Colors:</span>
                      <div className="flex space-x-1">
                        {product.colors.slice(0, 3).map((color) => (
                          <div
                            key={color}
                            className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                            style={{
                              backgroundColor: color.toLowerCase() === "white" ? "#ffffff" : color.toLowerCase(),
                            }}
                            title={color}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">+</span>
                          </div>
                        )}
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
                      className="bg-pink-500 hover:bg-pink-600 text-white transform hover:scale-105 transition-all duration-200"
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
              className="border-pink-300 dark:border-pink-600 text-pink-700 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300 bg-transparent"
            >
              Load More Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
