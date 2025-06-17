'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GoogleAuthButton from './GoogleAuthButton';
import { useFormSubmit } from '@/app/hooks/useFormSubmit';
import { jwtDecode } from 'jwt-decode';
import { useRedirect } from '@/app/hooks/useRedirect';
export default function SignUpForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    image: null, 
    flag:''
  });
  const redirectTo=useRedirect()

  const { submitForm } = useFormSubmit();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    
    
  
    setForm((prev) => ({
      ...prev,
      email: decoded.email,
      image: decoded.picture,
      flag:1
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('password', form.password);
    if (form.image) formData.append('image', form.image);
    formData.append("flag",form.flag === 1 ? 1 : 0)
    await submitForm({
      url: '/api/register',
      formData,
      onSuccess: () => {
        setForm({ email: '', password: '', image: null });
      },
    });
  };

  const getImagePreviewUrl = () => {
    if (form.image instanceof File) {
      return URL.createObjectURL(form.image);
    }
    return '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border border-gray-300 rounded-2xl shadow-sm max-w-md mx-auto bg-white">
      <div className="flex justify-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={getImagePreviewUrl()} />
          <AvatarFallback>IMG</AvatarFallback>
        </Avatar>
      </div>

      <Input
        placeholder="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <Input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
     <div className="text-center text-sm text-muted-foreground">or continue with</div>
     <div className="flex items-center justify-center gap-x-4">
     <div className="rounded-full overflow-hidden inline-block shadow-md">
     
      <GoogleAuthButton type="signup" onSuccess={handleGoogleSuccess} />
      </div>
      <Button type="button" onClick={() => redirectTo("/login")}>Login</Button>
      </div>
    </form>
  );
}
