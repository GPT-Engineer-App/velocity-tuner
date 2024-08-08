import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cat, Heart, Info } from "lucide-react";

const CatBreed = ({ name, description, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4 overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cat className="mr-2 h-5 w-5" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const CatCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="p-1"
            >
              <img src={src} alt={`Cat ${index + 1}`} className="mx-auto object-cover w-full h-80 rounded-lg shadow-lg" />
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [likedBreeds, setLikedBreeds] = useState([]);
  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  ];

  const toggleLike = (breedName) => {
    setLikedBreeds((prev) =>
      prev.includes(breedName)
        ? prev.filter((name) => name !== breedName)
        : [...prev, breedName]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          Feline Fascination
        </motion.h1>
        
        <CatCarousel />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              <Info className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="breeds">
              <Cat className="mr-2 h-4 w-4" />
              Breeds
            </TabsTrigger>
            <TabsTrigger value="care">
              <Heart className="mr-2 h-4 w-4" />
              Care Tips
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="mr-2 h-6 w-6" />
                      Cat Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                      independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                      characteristics and personalities. These elegant felines have captured the hearts of millions around the world
                      with their playful antics and soothing purrs.
                    </p>
                    <Button className="mt-4" onClick={() => setActiveTab("breeds")}>
                      Explore Cat Breeds
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="breeds">
                <h2 className="text-3xl font-semibold mb-4 text-purple-800">Popular Cat Breeds</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catBreeds.map((breed, index) => (
                    <motion.div key={breed.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
                      <CatBreed {...breed} />
                      <Button
                        variant={likedBreeds.includes(breed.name) ? "secondary" : "outline"}
                        className="mt-2 w-full"
                        onClick={() => toggleLike(breed.name)}
                      >
                        <Heart className={`mr-2 h-4 w-4 ${likedBreeds.includes(breed.name) ? "fill-current" : ""}`} />
                        {likedBreeds.includes(breed.name) ? "Liked" : "Like"}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="care">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="mr-2 h-6 w-6" />
                      Cat Care Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {[
                        "Provide a balanced diet suitable for your cat's age and health condition",
                        "Ensure fresh water is always available",
                        "Regular grooming to keep their coat healthy",
                        "Schedule regular vet check-ups",
                        "Offer mental stimulation with toys and play sessions",
                      ].map((tip, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge variant="secondary" className="mr-2 mt-1">Tip {index + 1}</Badge>
                          {tip}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
