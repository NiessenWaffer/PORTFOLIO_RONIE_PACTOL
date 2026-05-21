"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Camera } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  className?: string
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  className = "",
}: ProjectCardProps) {
  const [displayImage, setDisplayImage] = useState(image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setDisplayImage(url)
    }
  }

  return (
    <Card className={`overflow-hidden bg-card/50 backdrop-blur-sm border-border group hover:border-primary/50 transition-all duration-300 flex flex-col ${className}`}>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />

        {/* Upload Button */}
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-8 text-[10px] gap-1 bg-black/50 backdrop-blur-md text-white border-white/10 hover:bg-black/70"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-3 h-3" />
            Update Photo
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {githubUrl && (
            <Button variant="outline" size="icon" asChild className="rounded-full bg-background/20 backdrop-blur-md border-white/20 hover:bg-white/20">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 text-white" />
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button variant="outline" size="icon" asChild className="rounded-full bg-background/20 backdrop-blur-md border-white/20 hover:bg-white/20">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            </Button>
          )}
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary-foreground text-[10px] border-primary/20">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )
}
