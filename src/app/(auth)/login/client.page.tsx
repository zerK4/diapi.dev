"use client";

import { authSchema } from "@/schema/authSchema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Github from "@/components/icons/github";
import { login } from "@/app/actions/authActions";
import { toast } from "sonner";

function LoginClientPage() {
  const [noAccount, setNoAccount] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof authSchema>) {
    const promise = login(data);

    toast.promise(promise, {
      loading: "Logging in...",
      success: (res: any) => {
        console.log(res, "the resonse");
        if (res.status === 404) {
          setNoAccount(true);
        }

        if (res.status === 200) {
          setSuccess(true);
        }

        return <div>{res.message}</div>;
      },
      error: "Something went wrong",
    });

    console.log(data);
  }

  if (success) {
    return (
      <div className='max-w-auto md:w-[23rem] px-4'>
        <h2 className='text-2xl font-bold'>Success</h2>
        <p className='text-zinc-300'>
          You can close this window now and follow the instructions from the
          email we sent!
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-auto md:w-[23rem] px-4'>
      <div className='flex flex-col w-full justify-center my-6 gap-3'>
        <h2 className='text-2xl font-bold'>Log in to your account</h2>
        <p className='text-zinc-500 text-sm'>
          If you do not have an account we will prompt you to sign up.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {noAccount && (
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter your name' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <Button type='submit' className='w-full'>
              Submit
            </Button>
            <Button
              className='w-full bg-zinc-800 text-white flex justify-center gap-2 hover:bg-zinc-900'
              type='button'
            >
              <Github height={24} width={24} />
              <span>Sign in with Github</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginClientPage;
