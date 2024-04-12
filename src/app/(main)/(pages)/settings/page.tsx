"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function page() {
  return (
    <div>
      <div className=''>
        <div className='flex items-start gap-6 max-w-6xl w-full mx-auto'>
          <div className='flex flex-col w-full gap-6'>
            <Card className='w-full rounded-xl'>
              <CardHeader>
                <CardTitle>Workspace name</CardTitle>
                <CardDescription>
                  Used to identify your workspace on the dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input
                    placeholder='Default'
                    value='Default'
                    disabled
                    onChange={() => {}}
                  />
                </form>
              </CardContent>
              <CardFooter className='border-t py-3 px-6'>
                <Button className='rounded-lg'>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
