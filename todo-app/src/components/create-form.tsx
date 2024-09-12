'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Label } from "~/components/ui/label"

import { toast } from 'sonner'

export function CreateForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos del formulario:', formData)
    toast("Enviados")
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
    })
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Ítem</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Crear Ítem
        </Button>
      </form>
    </div>
  )
}
