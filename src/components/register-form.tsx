'use client'
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z.string().min(2, {
        message: "email must be at least 2 characters long",
    }), 
})

export function ProfileForm() {
    // TODO: implement loading state logic
    // const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // setLoading(true)
        // handle error here
    
        try {
            const response = await fetch('/api/mailing-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: values.email })
            })

            const data = await response.json()

            if (data.success) {
                router.push('/activity')
            } else {
                // handle error here
                console.error(data.error || 'Something went wrong');
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        // TODO: add loading state
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>welcome to con10scious</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn@example.com" type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                            Join the list to be notified when we launch
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="bg-black border border-zinc-800 text-white hover:bg-zinc-400 w-fit">Submit</Button>
            </form>
        </Form>
    )
}