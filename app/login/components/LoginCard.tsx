"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useLoginUseCase } from "@/app/login/use-cases/useLoginUseCase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import React from "react";

export const LoginCard = () => {
  const { credentials, setCredentials, loginAndRedirectIfSuccess } = useLoginUseCase();

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center  dark:bg-gray-800 dark:text-white">
      <Card className={`w-full sm:w-[100px] md:w-[300px] lg:w-[400px] p-4 border-0 sm:border shadow-none sm:shadow  dark:bg-gray-900 dark:text-white`}>
        <form onSubmit={loginAndRedirectIfSuccess}>  
          <CardHeader>
            <CardTitle className="flex justify-center">🎬 Cinetica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input 
                  className=" dark:bg-gray-800 dark:text-white"
                  id="username" 
                  placeholder="Enter your username" 
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  className=" dark:bg-gray-800 dark:text-white"
                  type="password" 
                  id="password" 
                  placeholder="Enter your password" 
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center ">
            <Button type="submit" variant="outline" className=" dark:bg-gray-800 dark:text-white">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
