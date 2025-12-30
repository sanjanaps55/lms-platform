"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {subjects} from "@/constants";
import {Textarea} from "@/components/ui/textarea";
import {redirect} from "next/navigation";
import {createCompanion} from "@/lib/actions/companion.action";

const formSchema = z.object({
  name: z.string().min(1, { message: "companion is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: 'Topic is required.'}),
  voice: z.string().min(1, { message: 'Voice is required.'}),
  style: z.string().min(1, { message: 'Style is required.'}),
  duration: z.string().min(1, { message: 'Duration is required.'}).refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: 'Duration must be a positive number.'}),
})
type FormValues = z.infer<typeof formSchema>

const CompanionForm = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          subject:"",
          topic:"",
          voice: '',
          style: '',
         duration: "15",
        },
      })
     
  const onSubmit = async (values: FormValues) => {
    const formData = {
      ...values,
      duration: Number(values.duration)

    }
    const companion = await createCompanion(formData);

    if(companion) {
        redirect(`/companions/${companion.id}`);
    } else {
        console.log('Failed to create a companion');
        redirect('/');
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Companion name</FormLabel>
            <FormControl>
              <Input placeholder="companion name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <Select 
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="input capitalize">
                  <SelectValue placeholder="select the subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem
                      value={subject}
                      key={subject}
                      className="capitalize"
                    >
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="topic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What should the companion help with?</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ex. Derivates & Integrals"
                {...field}
                className="input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="voice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Voice</FormLabel>
            <FormControl>
              <Select 
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="input ">
                  <SelectValue placeholder="select the voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">
                    male
                  </SelectItem>
                  <SelectItem value="female">
                    female
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="style"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Style</FormLabel>
            <FormControl>
              <Select 
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="input ">
                  <SelectValue placeholder="select the style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">
                    formal
                  </SelectItem>
                  <SelectItem value="casual">
                    casual
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Duration</FormLabel>
            <FormControl>
              <Input 
                placeholder="15" 
                {...field} 
                type='number'
                className='input'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
          <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
        </form>
      </Form>
    </div>
  )
}
export default CompanionForm;